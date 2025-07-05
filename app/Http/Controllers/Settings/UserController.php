<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller {
    public function edit() {
        try {
            $users = User::where( 'organzation_id', Auth::user()->organzation_id )->get();
            return Inertia::render( 'settings/users', [
                'users' => $users,
            ] );
        } catch ( \Throwable $th ) {
            Log::error( $th );
        }
    }
}