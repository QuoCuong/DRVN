<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'investor',
        'route_start',
        'route_end',
        'route_length',
        'location',
        'description',
        'start_date',
        'status',
        'supervisor_id',
        'construction_unit_id',
    ];
}
