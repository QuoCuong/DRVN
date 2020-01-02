<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    const STATUS_LIST = [
        'waiting'            => 'Chờ thi công',
        'under_construction' => 'Đang thi công',
        'completed'          => 'Đã hoàn thành',
        'approved'           => 'Đã duyệt',
        'suspended'          => 'Tạm dừng',
        'cancelled'          => 'Đã hủy',
    ];

    protected $fillable = [
        'name',
        'investor',
        'route_start',
        'route_end',
        'route_length',
        'location',
        'description',
        'start_date',
        'reason',
        'status',
        'supervisor_id',
        'construction_unit_id',
    ];

    public function loadAll()
    {
        return $this->load([
            'supervisor',
            'construction_unit',
            'images',
            'progresses' => function ($progresses) {
                $progresses->orderByDesc('id')->with('images');
            },
        ]);
    }

    public function scopeWithAll($query)
    {
        return $query->with([
            'supervisor',
            'construction_unit',
            'images',
            'progresses' => function ($progresses) {
                $progresses->orderByDesc('id')->with('images');
            },
        ]);
    }

    public function scopeStatusFilter($query, $status)
    {
        if ($status === '') {
            return $query;
        }

        return $query->whereStatus($status);
    }

    public function scopeSearch($query, $keyword)
    {
        if ($keyword === '') {
            return $query;
        }

        return $query
            ->where('name', 'like', "%$keyword%")
            ->orWhere('location', 'like', "%$keyword%");
    }

    public function updateStatus($status)
    {
        return $this->update([
            'status' => $status,
        ]);
    }

    public function supervisor()
    {
        return $this->hasOne(User::class, 'id', 'supervisor_id');
    }

    public function construction_unit()
    {
        return $this->hasOne(User::class, 'id', 'construction_unit_id');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function progresses()
    {
        return $this->hasMany(Progress::class);
    }
}
