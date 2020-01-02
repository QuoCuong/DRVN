<?php

namespace App\Observers;

use App\Progress;

class ProgressObserver
{
    /**
     * Handle the progress "created" event.
     *
     * @param  \App\Progress  $progress
     * @return void
     */
    public function created(Progress $progress)
    {
        if ($progress->is_complete) {
            $progress->project->updateStatus('completed');
        }
    }

    /**
     * Handle the progress "updated" event.
     *
     * @param  \App\Progress  $progress
     * @return void
     */
    public function updated(Progress $progress)
    {
        $project = $progress->project;
        if ($progress->is_complete && $project->status !== 'completed') {
            $project->updateStatus('completed');
        }
    }

    /**
     * Handle the progress "deleted" event.
     *
     * @param  \App\Progress  $progress
     * @return void
     */
    public function deleted(Progress $progress)
    {
        //
    }

    /**
     * Handle the progress "restored" event.
     *
     * @param  \App\Progress  $progress
     * @return void
     */
    public function restored(Progress $progress)
    {
        //
    }

    /**
     * Handle the progress "force deleted" event.
     *
     * @param  \App\Progress  $progress
     * @return void
     */
    public function forceDeleted(Progress $progress)
    {
        //
    }
}
