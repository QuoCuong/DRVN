<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    const ADMIN_ID             = 1;
    const SUPERVISOR_ID        = 2;
    const CONSTRUCTION_UNIT_ID = 3;

    protected $fillable = [
        'name', 'description',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
