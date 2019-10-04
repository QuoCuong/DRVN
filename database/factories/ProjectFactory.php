<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Project;
use App\Role;
use Faker\Generator as Faker;

$factory->define(Project::class, function (Faker $faker) {
    $supervisorIds       = Role::find(Role::SUPERVISOR_ID)->users()->pluck('users.id');
    $constructionUnitIds = Role::find(Role::CONSTRUCTION_UNIT_ID)->users()->pluck('users.id');

    return [
        'name'                 => $faker->sentence(),
        'investor'             => $faker->name,
        'route_start'          => $faker->numerify('Km ###'),
        'route_end'            => $faker->numerify('Km ###'),
        'route_length'         => $faker->numberBetween(100, 999),
        'location'             => $faker->address,
        'description'          => $faker->realText(),
        'start_date'           => $faker->dateTimeInInterval('+1 days', '+7 days'),
        'supervisor_id'        => $faker->randomElement($supervisorIds),
        'construction_unit_id' => $faker->randomElement($constructionUnitIds),
    ];
});
