<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'stripe_session_id',
        'stripe_payment_intent',
        'status',
        'customer_email',
        'customer_name',
        'total',
        'items',
    ];

    protected function casts(): array
    {
        return [
            'total' => 'decimal:2',
            'items' => 'array',
        ];
    }

    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }
}
