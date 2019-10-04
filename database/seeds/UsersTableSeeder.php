<?php

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
            'email'    => 'quoccuong15298@gmail.com',
            'fullname' => 'Admin',
            'phone'    => '0774864621',
            'password' => bcrypt('adminn'),
        ]);

        User::create([
            'email'    => 'test@gmail.com',
            'fullname' => 'Abc',
            'phone'    => '0774864621',
            'password' => bcrypt('adminn'),
        ]);

        factory(User::class, 30)->create()->each(function ($user) {
            $user->userRoles()->create(['role_id' => random_int(2, 3)]);
        });
    }
}
