<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Progress;
use Faker\Generator as Faker;

$factory->define(Progress::class, function (Faker $faker) {
    return [
        'name'        => $faker->name,
        'description' => $faker->sentence(100),
    ];
});
