<?php

use App\Progress;
use App\Project;
use Faker\Factory as Faker;
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
        $faker = Faker::create();

        factory(Project::class, 30)->create()->each(function ($project) {
            $project->progresses()->save(factory(Progress::class)->make());
            $project->progresses()->save(factory(Progress::class)->make());
            $project->progresses()->save(factory(Progress::class)->make());
        });

        Project::create([
            'name'                 => 'Hư hỏng trên nhiều tuyến đường ở TP Hà Tĩnh',
            'investor'             => $faker->name,
            'route_start'          => $faker->numerify('Km ###'),
            'route_end'            => $faker->numerify('Km ###'),
            'route_length'         => $faker->numberBetween(100, 999),
            'location'             => 'Phố Trung Lân (phường Thạch Quý, TP Hà Tĩnh)',
            'description'          => '<p>Tuyến đường Nguyễn Du kéo dài, từ đoạn giao với đường Nguyễn Công Trứ tới đoạn giao với đường Mai Thúc Loan đang dần xuống cấp, xuất hiện nhiều ổ gà, ổ vịt.</p><p><br></p><p>Đặc biệt, đoạn chạy qua khối phố Trung Lân (phường Thạch Quý, TP Hà Tĩnh) và đoạn gần trụ sở Công an phường Thạch Quý hư hỏng, nhiều chỗ lớp nhựa bị xói mòn, tạo thành hố sâu, đá dăm bật lên lởm chởm. Ngoài ra, mặt đường còn có hiện tượng lượn sóng, nứt nẻ.</p><p><br></p><p>Tuyến đường Nguyễn Du kéo dài có số lượng phương tiện lưu thông đông. Người dân khi điều khiển phương tiện giao thông qua đây đều phải giảm tốc độ, tránh các ổ gà, ổ vịt. Nguy hiểm nhất là vào buổi tối, nếu người tham gia giao thông không chú ý quan sát, dễ dẫn tới các vụ tai nạn giao thông.</p><p><br></p><p>“Tuyến đường xuống cấp lâu rồi nhưng không thấy đơn vị nào sửa chữa. Tôi hay chạy xe máy qua đây vào buổi đêm, vừa phải tránh xe, vừa phải tránh ổ gà, rất khó khăn” - ông Nguyễn Văn Sơn (SN 1960, trú xã Thạch Đồng, TP Hà Tĩnh) chia sẻ.</p><p>Tình trạng xuống cấp, hư hỏng cũng xảy ra ở nhiều tuyến đường khác trên địa bàn TP Hà Tĩnh, như ngõ 151 đường Vũ Quang (phường Thạch Linh), đoạn cuối đường Nguyễn Công Trứ (phường Nguyễn Du), hay đường Trung Tiết, từ đoạn giao với đường Nguyễn Công Trứ tới đoạn giao với đường Nguyễn Trung Thiên.</p><p><br></p><p>Trao đổi về vấn đề này, Trưởng phòng Quản lý đô thị UBND TP Hà Tĩnh Tô Thái Hòa cho biết, mỗi năm ngân sách của tỉnh và thành phố phân bổ từ 1,5 tới 2 tỷ đồng để duy tu, sửa chữa các tuyến đường.</p><p>Sắp tới, đơn vị sẽ có đợt dắm vá các ổ voi, ổ gà trên các tuyến đường trên địa bàn.</p>',
            'start_date'           => $faker->dateTimeBetween('now', '+7 days', 'Asia/Ho_Chi_Minh'),
            'supervisor_id'        => 2,
            'construction_unit_id' => 3,
        ]);

        Project::create([
            'name'                 => 'Ổ gà, ổ vịt trên quốc lộ 1',
            'investor'             => $faker->name,
            'route_start'          => $faker->numerify('Km ###'),
            'route_end'            => $faker->numerify('Km ###'),
            'route_length'         => $faker->numberBetween(100, 999),
            'location'             => 'Quận Thủ Đức, TP.HCM',
            'description'          => 'Thời gian qua, người dân trên quốc lộ 1 (quận Thủ Đức, TP.HCM) bất bình trước tình trạng làn đường xe máy bị thu hẹp bởi ổ gà, ổ vịt.',
            'start_date'           => $faker->dateTimeBetween('now', '+7 days', 'Asia/Ho_Chi_Minh'),
            'supervisor_id'        => 2,
            'construction_unit_id' => 3,
        ]);

        Project::create([
            'name'                 => 'Vết toác dài trên đường dẫn cầu vượt cao tốc Đà Nẵng - Quảng Ngãi',
            'investor'             => 'Tổng công ty Xây dựng số 1 (Bộ Xây dựng) và Công ty TNHH kỹ thuật và xây dựng Lotte',
            'route_start'          => $faker->numerify('Km ###'),
            'route_end'            => $faker->numerify('Km ###'),
            'route_length'         => $faker->numberBetween(100, 999),
            'location'             => 'Taluy âm phía đường dẫn lên cầu (bên phải theo hướng Tam Kỳ - Phú Ninh)',
            'description'          => '<p><strong style="color: rgb(51, 51, 51);">Đường dẫn cầu vượt cao tốc Đà Nẵng - Quảng Ngãi nứt toác, dài hàng chục mét dù mới được đưa vào sử dụng một năm.</strong></p><p><br></p><p><span style="color: rgb(51, 51, 51);">Cao tốc Đà Nẵng - Quảng Ngãi được thông xe tháng 8/2017 trên đoạn tuyến vốn của JICA và tháng 1/2018 trên đoạn tuyến vốn của WB. Dù cao tốc được đưa vào hoạt động gần 2 năm, đến nay nhiều vấn đề tồn tại ảnh hưởng đến an toàn giao thông, đời sống sinh hoạt và sản xuất của người dân vẫn chưa được giải quyết.</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">Ngày 5/11, người dân phản ánh đường dẫn cầu vượt tuyến cao tốc Đà Nẵng - Quảng Ngãi qua địa phận xã Tam Đại, huyện Phú Ninh (Quảng Nam), xuất hiện vết lún, nứt toác.</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);"><span class="ql-cursor">﻿</span>Đoạn đường dẫn và cầu vượt cao tốc thuộc gói thầu A1 do liên danh Tổng công ty Xây dựng số 1 (Bộ Xây dựng) và Công ty TNHH kỹ thuật và xây dựng Lotte thi công.</span></p>',
            'start_date'           => $faker->dateTimeBetween('now', '+7 days', 'Asia/Ho_Chi_Minh'),
            'supervisor_id'        => 2,
            'construction_unit_id' => 3,
        ]);

        Project::create([
            'name'                 => '"Ổ gà" đường cao tốc Đà Nẵng - Quảng Ngãi',
            'investor'             => 'Giang Tô',
            'route_start'          => $faker->numerify('Km ###'),
            'route_end'            => $faker->numerify('Km ###'),
            'route_length'         => $faker->numberBetween(100, 999),
            'location'             => 'Thôn Phú Lễ, xã Bình Trung, huyện Bình Sơn (tỉnh Quảng Ngãi)',
            'description'          => 'Trong khoảng gần 500m tại Km 107 xuất hiện nhiều "ổ gà". Các "ổ gà" này có đường kính từ 10-15 cm, vài "ổ gà" rộng có đường kính khoảng 40cm. Những "ổ gà" lớn đã được trám lại bằng xi măng hoặc bê tông nhựa, một số vẫn chưa được trám.',
            'start_date'           => $faker->dateTimeBetween('now', '+7 days', 'Asia/Ho_Chi_Minh'),
            'supervisor_id'        => 2,
            'construction_unit_id' => 3,
        ]);

    }
}
