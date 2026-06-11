<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolio_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('service_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('staff_member_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('short_description');
            $table->text('full_description')->nullable();
            $table->string('image_path');
            $table->jsonb('gallery')->nullable();
            $table->jsonb('products_used')->nullable();
            $table->string('duration_label')->nullable();
            $table->string('price_label')->nullable();
            $table->string('hair_type_label')->nullable();
            $table->string('longevity_label')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestampTz('published_at')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->timestamps();

            $table->index(['is_published', 'published_at']);
            $table->index(['portfolio_category_id', 'is_published', 'published_at']);
            $table->index(['staff_member_id', 'is_featured']);
            $table->index(['service_id', 'is_published']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_items');
    }
};
