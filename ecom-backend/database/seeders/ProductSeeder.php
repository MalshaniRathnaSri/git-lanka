<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['title' => 'Televisions', 'img' => 'images/categories/categories-01.png'],
            ['title' => 'Laptop & PC', 'img' => 'images/categories/categories-02.png'],
            ['title' => 'Mobile & Tablets', 'img' => 'images/categories/categories-03.png'],
            ['title' => 'Games & Videos', 'img' => 'images/categories/categories-04.png'],
            ['title' => 'Home Appliances', 'img' => 'images/categories/categories-05.png'],
            ['title' => 'Health & Sports', 'img' => 'images/categories/categories-06.png'],
            ['title' => 'Watches', 'img' => 'images/categories/categories-07.png'],
            ['title' => 'Televisions', 'img' => 'images/categories/categories-04.png'],
        ];

        foreach ($data as $item) {
            Product::create([
                'brand' => $item['title'],          
                'name' => $item['title'],           
                'image' => $item['img'],            
                'quantity' => rand(5, 20),          
                'cost_price' => rand(50, 200),      
                'sell_price' => rand(100, 500),     
                'description' => 'Sample product for '.$item['title'],
                'rating' => rand(1, 5),
                'is_active' => true,
            ]);
        }
    }
}
