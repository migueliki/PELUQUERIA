<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('appointments')) {
            if (DB::table('appointments')->count() > 0) {
                throw new RuntimeException('La tabla appointments ya existe y contiene datos. Migra esas citas antes de ejecutar esta migracion.');
            }

            Schema::drop('appointments');
        }

        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('staff_member_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('phone', 30);
            $table->string('email')->nullable();
            $table->timestampTz('appointment_at');
            $table->string('status', 30)->default('pending');
            $table->string('source', 30)->default('website');
            $table->text('notes')->nullable();
            $table->text('internal_notes')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->timestampTz('confirmed_at')->nullable();
            $table->timestampTz('cancelled_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'appointment_at']);
            $table->index(['staff_member_id', 'appointment_at']);
            $table->index(['service_id', 'appointment_at']);
            $table->index(['source', 'appointment_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
