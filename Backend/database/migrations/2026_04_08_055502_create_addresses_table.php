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
    Schema::create('addresses', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('user_id')->nullable(); 
        $table->string('full_name');
        $table->string('phone');
        $table->string('pincode', 6); 
        $table->string('city');
        $table->string('state'); 
        $table->text('address');
        $table->string('landmark')->nullable(); 
        $table->string('type')->default('Home'); 
        $table->boolean('is_default')->default(false); 
        $table->timestamps();
    });
}
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
