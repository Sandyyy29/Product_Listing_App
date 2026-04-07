<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Product extends Model
{
    use HasFactory;

 protected $fillable = [
    'name', 'brand', 'price', 'original_price', 
    'description', 'specifications', 'main_image', 'gallery_images',    
    'stock', 'category'
];

protected $casts = [
    'specifications' => 'array',
    'gallery_images' => 'array',
];
}