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
        'fullname', 'phone', 'email', 'password', 'role_id', 'is_lock',
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

    public function supervisorProjects()
    {
        return $this->hasMany(Project::class, 'supervisor_id');
    }

    public function constructionUnitProjects()
    {
        return $this->hasMany(Project::class, 'construction_unit_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function scopeSearch($query, $keyword)
    {
        if ($keyword === '') {
            return $query;
        }

        return $query
            ->where('email', 'like', "%$keyword%")
            ->orWhere('fullname', 'like', "%$keyword%");
    }

    public function scopeRoleFilter($query, $role)
    {
        if ($role === '') {
            return $query;
        }

        return $query->whereRoleId($role);
    }

    public function startProject($projectId)
    {
        Project::findOrFail($projectId)->updateStatus('under_construction');
    }

    public function suspendProject($projectId, $reason)
    {
        Project::findOrFail($projectId)->update([
            'status' => 'suspended',
            'reason' => $reason
        ]);
    }

    public function cancelProject($projectId, $reason)
    {
        Project::findOrFail($projectId)->update([
            'status' => 'cancelled',
            'reason' => $reason
        ]);
    }

    public function approveProject($projectId)
    {
        Project::findOrFail($projectId)->updateStatus('approved');
    }
}
