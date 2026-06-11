<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'product_category_id',
        'name',
        'slug',
        'short_description',
        'description',
        'sku',
        'price',
        'stock',
        'image_path',
        'is_featured',
        'is_active',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'metadata' => 'array',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    public function scopeCatalog(Builder $query): Builder
    {
        return $query
            ->with(['category:id,name,slug'])
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('name');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
