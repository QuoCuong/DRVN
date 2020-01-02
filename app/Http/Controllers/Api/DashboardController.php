<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;

class DashboardController extends Controller
{
    public function index()
    {
        $projectStatusCount = DB::table('projects')->select('status', DB::raw('count(*) as total'))->groupBy('status')->get()->keyBy('status');

        return response()->json([
            'projectStatusCount' => $projectStatusCount,
        ], Response::HTTP_OK);
    }
}
