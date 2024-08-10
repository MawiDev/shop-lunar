<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Lunar\Models\Collection;
use Lunar\Models\Url;

class CollectionsController extends Controller
{
    public function slug($slug): Response
    {
        $collection = URL::whereElementType(Collection::class)
            ->where("slug", $slug)
            ->firstOrFail()?->element;

        $collectionProducts = $collection
            ->products()
            ->with("thumbnail", "urls")
            ->get();

        return inertia("CollectionPage", [
            "collection" => $collection,
            "collectionProducts" => $collectionProducts,
        ]);
    }
}
