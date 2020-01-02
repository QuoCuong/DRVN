<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Progress extends Model
{
    protected $fillable = [
        'name',
        'description',
        'issues',
        'project_id',
        'is_complete',
        'confirmed_at',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function confirm()
    {
        $this->update([
            'confirmed_at' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
    }
}
