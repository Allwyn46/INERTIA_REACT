<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller {
    /**
    * Show the registration page.
    */

    public function create(): Response {
        return Inertia::render( 'auth/register' );
    }

    /**
    * Handle an incoming registration request.
    *
    * @throws \Illuminate\Validation\ValidationException
    */

    public function store( Request $request ): RedirectResponse {
        $request->validate( [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => [ 'required', 'confirmed', Rules\Password::defaults() ],
        ] );

        $user = User::create( [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make( $request->password ),
        ] );

        event( new Registered( $user ) );

        Auth::login( $user );

        return redirect()->intended( route( 'dashboard', absolute: false ) );
    }

    public function signup() {
        try {
            return Inertia::render( 'auth/organisationregister' );
        } catch ( \Throwable $th ) {
            Log::error( $th );
        }
    }

    public function signupstore( Request $request ): RedirectResponse {
        $request->validate( [
            'organisation_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => [ 'required', 'confirmed', Rules\Password::defaults() ],
        ] );

        $user = User::create( [
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->mobile_num,
            'password' => Hash::make( $request->password ),
        ] );

        $organization = Organization::create( [
            'organization_name'=>$request->organisation_name,
            'organization_owner'=>$user->id,
            'organization_plan_type'=>'TRIAL',
            'organization_users_count'=>'1',
        ] );

        $existingUser = User::find( $user->id );

        $existingUser->update( [
            'user_role'=>'ORGANIZATION_ADMIN',
            'organzation_id'=>$organization->id,
        ] );

        event( new Registered( $user ) );

        Auth::login( $user );

        return redirect()->intended( route( 'dashboard', absolute: false ) );
    }
}