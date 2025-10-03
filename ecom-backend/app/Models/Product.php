<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'name',
        'image',
        'quantity',
        'cost_price',
        'sell_price',
        'description',
        'rating',
        'is_active',
    ];
}
