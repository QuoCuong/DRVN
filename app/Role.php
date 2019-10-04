<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name',
    ];

    const ADMIN_ID             = 1;
    const SUPERVISOR_ID        = 2;
    const CONSTRUCTION_UNIT_ID = 3;

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_roles');
    }
}
