<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\ImageHandler;
use App\Progress;
use App\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProgressController extends Controller
{
    use ImageHandler;

    public function storeByProject(Project $project, Request $request)
    {
        $request->validate([
            'name'        => 'required',
            'description' => 'string|nullable',
            'is_complete' => 'boolean',
            'images'      => 'required|array',
        ]);

        $progress = $project->progresses()->create($request->only('name', 'description', 'is_complete'));

        foreach ($request->images as $image) {
            $progress->images()->create([
                'path' => '/storage' . ltrim($this->uploadImage($image, 'progress'), 'public'),
            ]);
        }

        return response()->json([
            'message' => 'Thành công',
        ], Response::HTTP_OK);
    }

    public function confirmProgress(Progress $progress)
    {
        DB::beginTransaction();
        try {
            $progress->confirm();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            dd($e);
        }

        return response()->json([
            'progress' => $progress,
        ], Response::HTTP_OK);
    }

    public function updateIssues(Progress $progress, Request $request)
    {
        $request->validate([
            'issues' => 'required'
        ]);

        $progress->update([
            'issues' => $request->issues
        ]);

        return response()->json([
            'message' => 'Thành công'
        ], Response::HTTP_OK);
    }
}
