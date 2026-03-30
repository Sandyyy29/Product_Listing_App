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
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:1',
            'category' => 'required|string',
            'image_url' => 'required|string',
            'description' => 'nullable|string'
        ]);

        $product = Product::create($validated);
        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }
}
