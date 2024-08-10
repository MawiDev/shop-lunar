<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CollectionsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("Welcome");
});

Route::get("/collections/{slug}", [CollectionsController::class, "slug"])->name(
    "collections.slug"
);

Route::get("/dashboard", function () {
    return Inertia::render("Dashboard");
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::middleware("auth")->group(function () {
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit"
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update"
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy"
    );

    Route::get("/address", [AddressController::class, "edit"])->name(
        "address.edit"
    );
    Route::patch("/address", [AddressController::class, "update"])->name(
        "address.update"
    );
});

require __DIR__ . "/auth.php";
