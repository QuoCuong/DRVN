<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fullname', 'phone', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function assignRoles(array $roles)
    {
        foreach ($roles as $key => $role) {
            if ($role == 'true') {
                $this->userRoles()->create(['role_id' => $key + 1]);
            }
        }
    }

    public function supervisorProjects()
    {
        return $this->hasMany('App\Project', 'supervisor_id');
    }

    public function constructionUnitProjects()
    {
        return $this->hasMany('App\Project', 'construction_unit_id');
    }

    public function userRoles()
    {
        return $this->hasMany('App\UserRole');
    }

    public function roles()
    {
        return $this->belongsToMany('App\Role', 'user_roles');
    }
}
