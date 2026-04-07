<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;


class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->search) {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        if ($request->sort == 'low') {
            $query->orderBy('price', 'asc');
        } elseif ($request->sort == 'high') {
            $query->orderBy('price', 'desc');
        }

        $products = $query->paginate(10);

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json($product);
    }


public function store(Request $request)
{

    $validated = $request->validate([
        'name'           => 'required|string|max:30',
        'brand'          => 'required|string|max:100',
        'price'          => 'required|numeric|min:1',
        'original_price' => 'nullable|numeric|min:1',
        'category'       => 'required|string',
        'stock'          => 'required|integer|min:0',
        'description'    => 'required|string',
        'specifications' => 'nullable|string', 
        'main_image'     => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        'gallery_images' => 'nullable|array', 
        // 'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048', 
    ]);

  
    $mainImagePath = $request->file('main_image')->store('products', 'public');

    $galleryPaths = [];
    if ($request->hasFile('gallery_images')) {
        foreach ($request->file('gallery_images') as $file) {
 
            $galleryPaths[] = $file->store('gallery', 'public');
        }
    }

    // 4. Create Product in Database
    $product = Product::create([
        'name'           => $request->name,
        'brand'          => $request->brand,
        'price'          => $request->price,
        'original_price' => $request->original_price,
        'category'       => $request->category,
        'stock'          => $request->stock,
        'description'    => $request->description,
        'main_image'     => $mainImagePath,
        // Convert JSON string from React back to Array
        'specifications' => json_decode($request->specifications), 
        // Save the array of paths (Laravel casts this to JSON automatically)
        'gallery_images' => $galleryPaths, 
    ]);

    return response()->json([
        'message' => 'Product published successfully!',
        'product' => $product
    ], 201);
}



    
    public function categories()
{
    $categories = Product::selectRaw('TRIM(LOWER(category)) as category')
        ->distinct()
        ->pluck('category');

    return response()->json($categories);
}
}
