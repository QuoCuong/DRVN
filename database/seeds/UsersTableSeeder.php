<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email'    => 'admin@gmail.com',
            'fullname' => 'Quản trị viên',
            'phone'    => '0774864621',
            'password' => bcrypt('adminn'),
            'role_id'  => Role::ADMIN_ID,
        ]);

        User::create([
            'email'    => 'supervisor@gmail.com',
            'fullname' => 'Giám sát viên',
            'phone'    => '0774864621',
            'password' => bcrypt('adminn'),
            'role_id'  => Role::SUPERVISOR_ID,
        ]);

        User::create([
            'email'    => 'construction@gmail.com',
            'fullname' => 'Đơn vị thi công',
            'phone'    => '0774864621',
            'password' => bcrypt('adminn'),
            'role_id'  => Role::CONSTRUCTION_UNIT_ID,
        ]);
    }
}
