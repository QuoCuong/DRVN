<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin APIs
Route::group([
    'prefix' => 'admin',
], function () {
    Route::post('login', 'Auth\JWTAuthController@login');
    Route::middleware('jwt.auth')->group(function () {

        Route::group(['namespace' => 'Auth'], function () {
            Route::get('auth', 'JWTAuthController@user');
            Route::post('logout', 'JWTAuthController@logout');
        });

        Route::group(['namespace' => 'Api'], function () {
            Route::get('users', 'UserController@index');
            Route::post('users', 'UserController@store');

            Route::get('projects', 'ProjectController@index');
            Route::get('projects/supervisor', 'ProjectController@supervisor');
            Route::get('projects/construction_unit', 'ProjectController@constructionUnit');
        });
    });
});
