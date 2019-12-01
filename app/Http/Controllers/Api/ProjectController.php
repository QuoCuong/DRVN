<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\ImageHandler;
use App\Project;
use App\User;
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
    public function index()
    {
        $projects = Project::orderByDesc('id')->paginate(10);

        return response()->json($projects, Response::HTTP_OK);
    }

    public function supervisor()
    {
        $projects = User::find(auth()->user()->id)->supervisorProjects()->orderByDesc('id')->paginate(10);

        return response()->json($projects, Response::HTTP_OK);
    }

    public function constructionUnit()
    {
        $projects = User::find(auth()->user()->id)->constructionUnitProjects()->orderByDesc('id')->paginate(10);

        return response()->json($projects, Response::HTTP_OK);
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
        $project = Project::with('images')->find($id);

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
                foreach($project->images as $image) {
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
            'project' => $project,
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
}
