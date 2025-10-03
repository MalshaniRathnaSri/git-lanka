<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

abstract class Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%$search%")
                  ->orWhere('brand', 'like', "%$search%");
        }

        $products = $query->where('is_active', true)->paginate(12);
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'quantity' => 'required|integer|min:0',
            'cost_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'rating' => 'nullable|integer|between:1,5',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);

        return response()->json(['message' => 'Product added', 'product' => $product], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'brand' => 'sometimes|string|max:255',
            'name' => 'sometimes|string|max:255',
            'image' => 'nullable|image|max:2048',
            'quantity' => 'sometimes|integer|min:0',
            'cost_price' => 'sometimes|numeric|min:0',
            'sell_price' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
            'rating' => 'nullable|integer|between:1,5',
            'is_active' => 'nullable|boolean',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($product->image) Storage::disk('public')->delete($product->image);
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        return response()->json(['message' => 'Product updated', 'product' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) Storage::disk('public')->delete($product->image);

        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }

    public function toggleActive($id)
    {
        $product = Product::findOrFail($id);
        $product->is_active = !$product->is_active;
        $product->save();

        return response()->json(['message' => 'Product status updated', 'product' => $product]);
    }
}
