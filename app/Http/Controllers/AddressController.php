<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Lunar\Models\Address;

class AddressController extends Controller
{
    public function edit(): Response
    {
        // Ottieni l'utente autenticato
        $user = Auth::user();

        // Usa il trait LunarUser per ottenere l'ultimo cliente associato all'utente
        $customer = $user->latestCustomer();

        $address = Address::where("customer_id", $customer->id)->get();

        return Inertia::render("Profile/Address/Edit", ["address" => $address]);
    }
}
