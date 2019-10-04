<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $fillable = [
        'name',
        'project_id',
        'is_complete',
        'confirmed_at',
    ];
}
