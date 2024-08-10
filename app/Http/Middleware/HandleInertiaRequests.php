<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Lunar\Models\CollectionGroup;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = "app";

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Fetch collection groups and map them
        $collectionGroups = CollectionGroup::with(["collections.urls"])
            ->get()
            ->map(function ($group) {
                return [
                    "id" => $group->id,
                    "name" => $group->name,
                    "handle" => $group->handle,
                    "collections" => $group->collections->map(function (
                        $collection
                    ) {
                        // Access the value of name from the nested structure
                        $attributeData = $collection->attribute_data->get(
                            "name"
                        );

                        // If 'attribute_data' contains a 'TranslatedText' object
                        if (
                            $attributeData instanceof
                            \Lunar\FieldTypes\TranslatedText
                        ) {
                            $name = $attributeData->getValue()["en"] ?? "N/A";
                        } else {
                            $name = "N/A";
                        }

                        return [
                            "id" => $collection->id,
                            "name" => $name,
                            "slug" =>
                                $collection->urls->firstWhere("default", true)
                                    ->slug ?? "",
                        ];
                    }),
                ];
            });

        return [
            ...parent::share($request),
            "auth" => [
                "user" => $request->user(),
            ],
            "collectionGroups" => $collectionGroups,
        ];
    }
}
