<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = [
        'service_id',
        'staff_member_id',
        'full_name',
        'phone',
        'email',
        'appointment_at',
        'status',
        'source',
        'notes',
        'internal_notes',
        'metadata',
        'confirmed_at',
        'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'appointment_at' => 'datetime',
            'confirmed_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function staffMember(): BelongsTo
    {
        return $this->belongsTo(StaffMember::class);
    }

    public function scopeAdminIndex(Builder $query): Builder
    {
        return $query
            ->with([
                'service:id,service_category_id,name,slug',
                'service.category:id,name,slug',
                'staffMember:id,display_name,slug',
            ])
            ->orderBy('appointment_at');
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query
            ->where('appointment_at', '>=', now())
            ->whereIn('status', ['pending', 'confirmed'])
            ->orderBy('appointment_at');
    }
}
