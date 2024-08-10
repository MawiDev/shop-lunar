<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Lunar\Models\Product;
use Lunar\Models\Url;

class ProductsController extends Controller
{
    public function slug($slug): Response
    {
        $productSlug = Url::whereElementType(Product::class)
            ->where("slug", $slug)
            ->firstOrFail()?->element;
        $product = $productSlug->with("images", "thumbnail", "prices")->first();

        return Inertia::render("Products/Show", ["product" => $product]);
    }
}
