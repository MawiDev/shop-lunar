<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Lunar\Models\Address;
use Lunar\Models\Customer;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render("Auth/Register");
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            "name" => "required|string|max:255",
            "email" =>
                "required|string|lowercase|email|max:255|unique:" . User::class,
            "password" => ["required", "confirmed", Rules\Password::defaults()],
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        event(new Registered($user));

        $customer = Customer::create([
            "first_name" => $request->name,
            "last_name" => "",
            "meta" => [
                "account_no" => "GENERIC_ACCOUNT_NO", // Puoi generare un numero di conto se necessario
            ],
        ]);

        $address = Address::create([
            "first_name" => "",
            "last_name" => "",
            "customer_id" => $customer->id,
            "line_one" => "",
            "city" => "",
            "delivery_instructions" => "",
            "contact_email" => $user->email,
            "contact_phone" => "",
        ]);

        $customer->users()->attach($user);
        $address->save();

        Auth::login($user);

        return redirect(route("dashboard", absolute: false));
    }
}
