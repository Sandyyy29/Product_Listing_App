<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Address;
use Illuminate\Support\Facades\Validator;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Validator;

class AddressController extends Controller
{
    public function store(Request $request) 
    {
        
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'phone'     => 'required|numeric|digits:10', 
            'pincode'   => 'required|digits:6',         
            'city'      => 'required|string',
            'state'     => 'required|string',
            'address'   => 'required|string|min:10',    
            'type'      => 'required|in:Home,Work',     
            'user_id'   => 'nullable|exists:users,id', 
        ]);

       
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

       
        try {
            $address = Address::create($validator->validated());
            
            return response()->json([
                'status'  => 'success',
                'message' => 'Address saved successfully!',
                'data'    => $address
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Server Error: ' . $e->getMessage()
            ], 500);
        }
    }
}