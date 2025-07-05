<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;

class UserController extends Controller {
    public function edit() {
        try {
            $users = User::where( 'organzation_id', Auth::user()->organzation_id )->get();
            $managerusers = User::where( 'organzation_id', Auth::user()->organzation_id )->where( 'user_role', 'ORGANIZATION_ADMIN' )->first();
            $teamleaderusers = User::where( 'organzation_id', Auth::user()->organzation_id )->where( 'user_role', 'ORGANIZATION_MANAGER' )->get();
            $teammemberusers = User::where( 'organzation_id', Auth::user()->organzation_id )->where( 'user_role', 'ORGANIZATION_TEAM_LEADER' )->get();

            return Inertia::render( 'settings/users', [
                'users' => $users,
                'managerusers' => $managerusers,
                'teamleaderusers' => $teamleaderusers,
                'teammemberusers' => $teammemberusers,
            ] );
        } catch ( \Throwable $th ) {
            Log::error( $th );
        }
    }

    public function createuser( Request $request ) {
        try {
            $request->validate( [
                'name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:10',
                'user_role' => 'required',
                'assigned_to' => 'required',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => [ 'required', 'confirmed' ],
            ] );

            $user = User::create( [
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'user_role' => $request->user_role,
                'assigned_to' => $request->assigned_to,
                'organzation_id'=>Auth::user()->organzation_id,
                'password' => Hash::make( $request->password ),
            ] );

            return redirect()->back()->with( 'success', 'User Created Successfully' );
        } catch ( \Throwable $th ) {
            Log::eror( $th );
        }
    }
}