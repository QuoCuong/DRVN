<?php

use App\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name'        => 'admin',
            'description' => 'Quản trị viên',
        ]);

        Role::create([
            'name'        => 'supervisor',
            'description' => 'Giám sát viên',
        ]);

        Role::create([
            'name'        => 'construction unit',
            'description' => 'Đơn vị thi công',
        ]);
    }
}
