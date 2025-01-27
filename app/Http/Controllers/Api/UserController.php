<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\AccountInformation;
use App\Role;
use App\User;
use Auth;
use DB;
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
    public function index(Request $request)
    {
        $orderBy = $request->query('orderBy', 'asc');
        $role    = $request->query('role', '');
        $keyword = $request->query('search', '');

        if ($role) {
            $role = Role::where('name', $role)->first()->id;
        }

        $users = User::where('id', '!=', Auth::user()->id)
            ->search($keyword)
            ->roleFilter($role)
            ->orderBy('id', $orderBy)
            ->with('role')
            ->paginate(10);

        return response()->json($users, Response::HTTP_OK);
    }

    public function constructionUnit()
    {
        $users = Role::find(Role::CONSTRUCTION_UNIT_ID)->users;

        return response()->json($users, Response::HTTP_OK);
    }

    public function supervisor()
    {
        $users = Role::find(Role::SUPERVISOR_ID)->users;

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
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'email'    => 'required|unique:users,email',
                'fullname' => 'required',
                'phone'    => 'required',
                'role_id'  => 'required|numeric',
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

            $user = $this->createUser($request->only('email', 'fullname', 'phone', 'role_id'), $password);

            $this->sendAccountEmail($user, $password);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            dd($e);
        }

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
        return response()->json($user, Response::HTTP_OK);
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

    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'string',
        ]);

        $roleId = Role::where('name', $request->role)->firstOrFail()->id;

        $user = User::with('role')->findOrFail($id);
        $user->update([
            'role_id' => $roleId,
        ]);
        $user->refresh();

        return response()->json([
            'message' => 'Cập nhật vai trò thành công',
            'user'    => $user,
        ], Response::HTTP_OK);
    }

    public function lock($id)
    {
        $user = User::with('role')->findOrFail($id);
        $user->update([
            'is_lock' => true,
        ]);
        $user->refresh();

        return response()->json([
            'message' => 'Đã khóa tài khoản ' . $user->email,
            'user'    => $user,
        ], Response::HTTP_OK);
    }

    public function unlock($id)
    {
        $user = User::with('role')->findOrFail($id);
        $user->update([
            'is_lock' => false,
        ]);
        $user->refresh();

        return response()->json([
            'message' => 'Đã mở khóa tài khoản ' . $user->email,
            'user'    => $user,
        ], Response::HTTP_OK);
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
