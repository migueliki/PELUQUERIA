<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Testimonial extends Model
{
    protected $fillable = [
        'staff_member_id',
        'service_id',
        'customer_name',
        'customer_role',
        'customer_location',
        'content',
        'avatar_url',
        'rating',
        'is_featured',
        'sort_order',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:1',
            'is_featured' => 'boolean',
            'metadata' => 'array',
        ];
    }

    public function staffMember(): BelongsTo
    {
        return $this->belongsTo(StaffMember::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query
            ->with([
                'service:id,name,slug',
                'staffMember:id,display_name,slug',
            ])
            ->where('is_featured', true)
            ->orderBy('sort_order');
    }
}
