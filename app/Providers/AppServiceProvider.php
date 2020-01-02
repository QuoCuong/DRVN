<?php

namespace App\Providers;

use App\Observers\ProgressObserver;
use App\Progress;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Progress::observe(ProgressObserver::class);
    }
}
