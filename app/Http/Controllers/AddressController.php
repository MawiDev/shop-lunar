<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Lunar\Models\Address;
use Lunar\Models\Country;
use Lunar\Models\Customer;
use Lunar\Models\State;

class AddressController extends Controller
{
    public function edit(): Response
    {
        // Ottieni l'utente autenticato
        $user = Auth::user();

        // Usa il trait LunarUser per ottenere l'ultimo cliente associato all'utente
        $customer = $user->latestCustomer();

        $address = Address::where("customer_id", $customer->id)->first();

        $countries = Country::all();

        $states = State::all();

        return Inertia::render("Profile/Address/Edit", [
            "address" => $address,
            "countries" => $countries,
            "states" => $states,
        ]);
    }

    public function update(Request $request)
    {
        // Validazione dei dati
        $validatedData = $request->validate([
            "id" => "required|integer",
            "customer_id" => "required|integer",
            "title" => "nullable|string|max:10",
            "first_name" => "required|string|max:255",
            "last_name" => "required|string|max:255",
            "contact_email" => "required|string|email|max:255",
            "contact_phone" => "nullable|string|max:20",
            "line_one" => "required|string|max:255",
            "line_two" => "nullable|string|max:255",
            "line_three" => "nullable|string|max:255",
            "city" => "required|string|max:255",
            "postcode" => "required|integer",
            "country" => "required|string",
            "state" => "nullable|string",
            "delivery_instructions" => "nullable|string|max:1000",
        ]);

        // Trova l'indirizzo esistente
        $address = Address::findOrFail($validatedData["id"]);

        // Aggiorna i campi dell'indirizzo
        $address->update([
            "title" => $request->title,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "contact_email" => $request->contact_email,
            "contact_phone" => $request->contact_phone,
            "line_one" => $request->line_one,
            "line_two" => $request->line_two,
            "line_three" => $request->line_three,
            "city" => $request->city,
            "postcode" => $request->postcode,
            "country_id" => $request->country,
            "state" => $request->state,
            "delivery_instructions" => $request->delivery_instructions,
        ]);

        $customer = Customer::findOrfail($validatedData["customer_id"]);

        $customer->update([
            "title" => $request->title,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "account_ref" => Auth::user()->email,
        ]);

        return redirect()->route("address.edit");
    }
}
