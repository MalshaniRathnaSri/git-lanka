<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;

class AdminController extends Controller
{
    public function stats(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'total_products' => Product::count(),
            'total_customers' => User::where('role','user')->count(), 
            'total_users' => User::whereIn('role', ['admin','user'])->count(),
            'active_users' => User::where('is_active', true)->count(),
        ]);
    }
}
