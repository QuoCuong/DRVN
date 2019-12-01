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

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function progresses()
    {
        return $this->hasMany(Progress::class);
    }
}
