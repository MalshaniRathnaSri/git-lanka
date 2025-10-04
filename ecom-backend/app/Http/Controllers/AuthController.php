<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'contact' => 'required|string|max:15',
            'password' => 'required|string|min:6',
        ]);

        $customer = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'contact' => $request->contact,
            'password' => Hash::make($request->password),
        ]);

        $token = $customer->createToken('customer-token')->plainTextToken;

        return response()->json([
            'message' => 'Customer registered successfully',
            'customer' => $customer,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $customer = User::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $customer->createToken('customer-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'customer' => $customer,
            'token' => $token
        ]);
    }

    public function adminRegister(Request $request)
    {
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'contact' => 'nullable|string|max:15',
            'password' => 'required|string|min:6',
            'privileges' => 'nullable|array',
        ]);

        $admin = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'contact' => $request->contact,
            'password' => Hash::make($request->password),
            'role' => 'admin',
            'is_active' => true,
            'privileges' => $request->privileges ?? [],
        ]);

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Admin registered successfully',
            'admin' => $admin,
            'token' => $token
        ], 201);
    }

    public function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $u = User::where('email', $request->email)->first();

        if (!$u || !Hash::check($request->password, $u->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($u->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized: not an admin'], 403);
        }

        if (! $u->is_active) {
            return response()->json(['message' => 'Account deactivated'], 403);
        }

        $token = $u->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Admin login successful',
            'admin' => $u,
            'token' => $token
        ]);
    }

    public function profile(Request $request) 
    {
        return response()->json([
            'status' => true,
            'message' => 'User profile data',
            'user' => $request->user()
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'fname' => 'sometimes|string|max:255',
            'lname' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'contact' => 'sometimes|string|max:15',
            'password' => 'nullable|string|min:6',
        ]);

        $user->update([
            'fname' => $request->fname ?? $user->fname,
            'lname' => $request->lname ?? $user->lname,
            'email' => $request->email ?? $user->email,
            'contact' => $request->contact ?? $user->contact,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully!',
            'user' => $user
        ]);
    }

    public function logout(Request $request) 
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully!'
        ]);
    }

}
