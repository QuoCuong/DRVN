<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\AccountInformation;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('roles')->paginate(10);

        return response()->json($users, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|unique:users,email',
            'fullname' => 'required',
            'phone'    => 'required',
            'roles'    => 'required|array|min:3',
        ], [
            'email.unique'      => 'Email đã tồn tại',
            'fullname.required' => 'Vui lòng nhập họ và tên',
            'phone.required'    => 'Vui lòng nhập số điện thoại',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Lỗi dữ liệu',
                'errors'  => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $password = $this->generatePassword();

        $user = $this->createUser($request->only('email', 'fullname', 'phone'), $password);

        $user->assignRoles($request->roles);

        $this->sendAccountEmail($user, $password);

        return response()->json([
            'message' => 'Thêm tài khoản thành công',
        ], Response::HTTP_OK);
    }

    public function generatePassword()
    {
        return uniqid();
    }

    public function createUser($data, $password)
    {
        $data['password'] = bcrypt($password);

        return User::create($data);
    }

    public function sendAccountEmail(User $user, $password)
    {
        return Mail::to($user)->send(new AccountInformation($user->email, $password));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
