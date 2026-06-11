<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPost extends Model
{
    protected $fillable = [
        'blog_category_id',
        'author_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image_path',
        'likes_count',
        'comments_count',
        'is_published',
        'published_at',
        'seo',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'seo' => 'array',
            'metadata' => 'array',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(StaffMember::class, 'author_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->with([
                'category:id,name,slug',
                'author:id,display_name,slug,image_path',
            ])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderByDesc('published_at');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
