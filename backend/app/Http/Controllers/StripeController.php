<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

class StripeController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('stripe.secret'));
    }

    /**
     * Create a Stripe Checkout Session from cart items.
     */
    public function createCheckoutSession(Request $request): JsonResponse
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|string',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric|min:0.01',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.image' => 'nullable|string',
        ]);

        $lineItems = [];
        $orderItems = [];
        $total = 0;

        foreach ($request->items as $item) {
            $unitAmount = (int) round($item['price'] * 100); // Stripe uses cents
            $lineItems[] = [
                'price_data' => [
                    'currency' => config('stripe.currency', 'eur'),
                    'product_data' => [
                        'name' => $item['name'],
                        'images' => !empty($item['image']) ? [$item['image']] : [],
                    ],
                    'unit_amount' => $unitAmount,
                ],
                'quantity' => $item['quantity'],
            ];

            $subtotal = $item['price'] * $item['quantity'];
            $total += $subtotal;

            $orderItems[] = [
                'id' => $item['id'],
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
            ];
        }

        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => $frontendUrl . '/tienda/checkout/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $frontendUrl . '/tienda/checkout/cancel',
                'metadata' => [
                    'order_items' => json_encode($orderItems),
                ],
            ]);

            // Create a pending order
            Order::create([
                'stripe_session_id' => $session->id,
                'status' => 'pending',
                'total' => $total,
                'items' => $orderItems,
            ]);

            return response()->json([
                'url' => $session->url,
                'session_id' => $session->id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'No se pudo crear la sesión de pago.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle Stripe webhook events.
     */
    public function handleWebhook(Request $request): JsonResponse
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $webhookSecret = config('stripe.webhook_secret');

        if ($webhookSecret) {
            try {
                $event = Webhook::constructEvent($payload, $sigHeader, $webhookSecret);
            } catch (SignatureVerificationException $e) {
                return response()->json(['error' => 'Invalid signature'], 400);
            }
        } else {
            $event = json_decode($payload);
        }

        switch ($event->type ?? $event['type'] ?? '') {
            case 'checkout.session.completed':
                $session = $event->data->object ?? $event['data']['object'];
                $this->handleCheckoutCompleted($session);
                break;

            case 'checkout.session.expired':
                $session = $event->data->object ?? $event['data']['object'];
                Order::where('stripe_session_id', $session->id ?? $session['id'])
                    ->update(['status' => 'expired']);
                break;
        }

        return response()->json(['received' => true]);
    }

    /**
     * Handle a completed checkout session.
     */
    private function handleCheckoutCompleted($session): void
    {
        $sessionId = $session->id ?? $session['id'];
        $order = Order::where('stripe_session_id', $sessionId)->first();

        if ($order) {
            $order->update([
                'status' => 'paid',
                'stripe_payment_intent' => $session->payment_intent ?? $session['payment_intent'] ?? null,
                'customer_email' => $session->customer_details->email ?? $session['customer_details']['email'] ?? null,
                'customer_name' => $session->customer_details->name ?? $session['customer_details']['name'] ?? null,
            ]);

            // Update product stock
            foreach ($order->items as $item) {
                Product::where('slug', $item['id'])
                    ->orWhere('id', $item['id'])
                    ->decrement('stock', $item['quantity']);
            }
        }
    }

    /**
     * Get order details by session ID (for success page).
     */
    public function getOrder(Request $request): JsonResponse
    {
        $request->validate([
            'session_id' => 'required|string',
        ]);

        $order = Order::where('stripe_session_id', $request->session_id)->first();

        if (!$order) {
            return response()->json(['error' => 'Pedido no encontrado'], 404);
        }

        return response()->json([
            'id' => $order->id,
            'status' => $order->status,
            'total' => $order->total,
            'items' => $order->items,
            'customer_name' => $order->customer_name,
            'customer_email' => $order->customer_email,
            'created_at' => $order->created_at->toISOString(),
        ]);
    }
}
