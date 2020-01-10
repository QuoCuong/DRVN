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

    Route::group([
        'middleware' => ['jwt.auth', 'is.unlock']
    ], function () {

        Route::group(['namespace' => 'Auth'], function () {
            Route::get('auth', 'JWTAuthController@user');
            Route::post('logout', 'JWTAuthController@logout');
        });

        Route::group(['namespace' => 'Api'], function () {
            Route::get('/', 'DashboardController@index');

            Route::get('users', 'UserController@index');
            Route::get('users/construction_units', 'UserController@constructionUnit');
            Route::get('users/supervisors', 'UserController@supervisor');
            Route::get('users/{user}', 'UserController@show');
            Route::post('users', 'UserController@store');
            Route::post('users/{user}/role', 'UserController@updateRole');
            Route::post('users/{user}/lock', 'UserController@lock');
            Route::post('users/{user}/unlock', 'UserController@unlock');

            Route::get('projects', 'ProjectController@index');
            Route::get('projects/{project}', 'ProjectController@show');
            Route::post('projects', 'ProjectController@store');
            Route::put('projects/{project}', 'ProjectController@update');
            Route::post('projects/{project}/start', 'ProjectController@startProject');
            Route::post('projects/{project}/suspend', 'ProjectController@suspendProject');
            Route::post('projects/{project}/cancel', 'ProjectController@cancelProject');
            Route::post('projects/{project}/resume', 'ProjectController@resumeProject');
            Route::post('projects/{project}/approve', 'ProjectController@approveProject');
            Route::post('projects/{project}/progresses', 'ProgressController@storeByProject');

            Route::post('progresses/{progress}/confirm', 'ProgressController@confirmProgress');
            Route::post('progresses/{progress}/issues', 'ProgressController@updateIssues');
        });
    });
});
