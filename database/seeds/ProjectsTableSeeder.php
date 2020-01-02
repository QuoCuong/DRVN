<?php

use App\Progress;
use App\Project;
use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Project::class, 100)->create();
        // factory(Project::class, 100)->create()->each(function($project) {
        //     $project->progresses()->save(factory(Progress::class)->make());
        //     $project->progresses()->save(factory(Progress::class)->make());
        //     $project->progresses()->save(factory(Progress::class)->make());
        // });

        // Project::create([
        //     'name' => '"Ổ gà" đường cao tốc Đà Nẵng - Quảng Ngãi',
        //     'investor' => 'Giang Tô',
        //     'route_start' => 'Km 107',
        //     'route_end' => 'Km 107',
        //     'route_length' => '10,6 Km',
        //     'location' => 'Thôn Phú Lễ, xã Bình Trung, huyện Bình Sơn (tỉnh Quảng Ngãi)',
        //     'description' => 'Trong khoảng gần 500m tại Km 107 xuất hiện nhiều "ổ gà". Các "ổ gà" này có đường kính từ 10-15 cm, vài "ổ gà" rộng có đường kính khoảng 40cm. Những "ổ gà" lớn đã được trám lại bằng xi măng hoặc bê tông nhựa, một số vẫn chưa được trám.',
        //     'start_date' => '12-22-2019'
        // ]);
    }
}
