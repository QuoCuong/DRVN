<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $validator   = Validator::make($credentials, [
            'email'    => 'required|email',
            'password' => 'required',
        ], [
            'email.required'    => 'Vui lòng nhập địa chỉ email!',
            'email.email'       => 'Email không hợp lệ!',
            'password.required' => 'Vui lòng nhập mật khẩu!',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!($token = JWTAuth::attempt($credentials))) {
            return response()->json([
                'errors' => [
                    'email' => trans('auth.failed'),
                ],
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = User::with('role')->find(Auth::user()->id);

        return response()->json([
            'token' => $token,
            'user' => $user,
        ], Response::HTTP_OK);
    }

    public function user(Request $request)
    {
        $user = User::with('role')->find(Auth::user()->id);

        if ($user) {
            return response($user, Response::HTTP_OK);
        }

        return response(null, Response::HTTP_BAD_REQUEST);
    }

    public function logout(Request $request)
    {
        $this->validate($request, ['token' => 'required']);

        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json('You have successfully logged out.', Response::HTTP_OK);
        } catch (JWTException $e) {
            return response()->json('Failed to logout, please try again.', Response::HTTP_BAD_REQUEST);
        }
    }

    public function refresh()
    {
        return response(JWTAuth::getToken(), Response::HTTP_OK);
    }
}
