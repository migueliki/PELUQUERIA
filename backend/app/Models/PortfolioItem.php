<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioItem extends Model
{
    protected $fillable = [
        'portfolio_category_id',
        'service_id',
        'staff_member_id',
        'title',
        'slug',
        'short_description',
        'full_description',
        'image_path',
        'gallery',
        'products_used',
        'duration_label',
        'price_label',
        'hair_type_label',
        'longevity_label',
        'is_featured',
        'is_published',
        'published_at',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
            'products_used' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(PortfolioCategory::class, 'portfolio_category_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function staffMember(): BelongsTo
    {
        return $this->belongsTo(StaffMember::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->with([
                'category:id,name,slug',
                'service:id,name,slug',
                'staffMember:id,display_name,slug,image_path',
            ])
            ->where('is_published', true)
            ->orderByDesc('is_featured')
            ->orderByDesc('published_at');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
