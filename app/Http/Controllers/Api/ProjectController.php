<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\ImageHandler;
use App\Project;
use App\Role;
use App\User;
use Auth;
use DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProjectController extends Controller
{
    use ImageHandler;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orderBy = $request->query('orderBy', 'desc');
        $status  = $request->query('status', '');
        $keyword = $request->query('search', '');

        $projects = $this->getAllProjectsFromAuthUser();
        $projects = $projects
            ->search($keyword)
            ->statusFilter($status)
            ->orderBy('id', $orderBy)
            ->paginate(10);

        return response()->json($projects, Response::HTTP_OK);
    }

    private function getAllProjectsFromAuthUser()
    {
        switch (Auth::user()->role_id) {
            case Role::ADMIN_ID:
                return Project::query();
            case Role::CONSTRUCTION_UNIT_ID:
                return Auth::user()->constructionUnitProjects();
            case Role::SUPERVISOR_ID:
                return Auth::user()->supervisorProjects();
            default:
                return;
        }
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
            $project = Project::create($request->only('name', 'investor', 'route_start', 'route_end', 'route_length', 'location', 'description', 'start_date', 'supervisor_id', 'construction_unit_id'));

            if ($request->images) {
                foreach ($request->images as $image) {
                    $project->images()->create([
                        'path' => '/storage' . ltrim($this->uploadImage($image, 'project'), 'public'),
                    ]);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            dd($e);
        }

        return response()->json([
            'project' => $project,
            'message' => 'Thêm công trình thành công',
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::withAll()->find($id);

        return response()->json($project);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        DB::beginTransaction();

        try {
            $project->update($request->only('name', 'investor', 'route_start', 'route_end', 'route_length', 'location', 'description', 'start_date', 'supervisor_id', 'construction_unit_id'));

            if ($request->images) {
                foreach ($project->images as $image) {
                    $this->deleteImage($image->path);
                }

                $project->images()->delete();

                foreach ($request->images as $image) {
                    $project->images()->create([
                        'path' => '/storage' . ltrim($this->uploadImage($image, 'project'), 'public'),
                    ]);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            dd($e);
        }

        return response()->json([
            'project' => $project->loadAll(),
            'message' => 'Cập nhật công trình thành công',
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }

    public function startProject(Project $project)
    {
        Auth::user()->startProject($project->id);

        return response()->json([
            'message' => 'Đã bắt đầu công trình',
        ], Response::HTTP_OK);
    }

    public function suspendProject(Project $project, Request $request)
    {
        $request->validate([
            'reason' => 'required|string'
        ]);

        Auth::user()->suspendProject($project->id, $request->reason);

        return response()->json([
            'message' => 'Đã tạm dừng công trình',
        ], Response::HTTP_OK);
    }

    public function cancelProject(Project $project, Request $request)
    {
        $request->validate([
            'reason' => 'required|string'
        ]);

        Auth::user()->cancelProject($project->id, $request->reason);

        return response()->json([
            'message' => 'Đã hủy công trình',
        ], Response::HTTP_OK);
    }

    public function resumeProject(Project $project)
    {
        Auth::user()->startProject($project->id);

        return response()->json([
            'message' => 'Thành công',
        ], Response::HTTP_OK);
    }

    public function approveProject(Project $project)
    {
        Auth::user()->approveProject($project->id);

        return response()->json([
            'project' => $project,
        ], Response::HTTP_OK);
    }
}
