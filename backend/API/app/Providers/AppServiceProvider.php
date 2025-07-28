<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// zbog latinice
use Faker\Factory as FakerFactory;
use Faker\Generator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // latinica
        $this->app->singleton(Generator::class, function () {
        return FakerFactory::create('sr_Latn_RS');
    });
    }
}
