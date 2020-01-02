<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('investor');
            $table->string('route_start');
            $table->string('route_end');
            $table->string('route_length');
            $table->string('location');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->string('reason')->nullable();
            $table->enum('status', [
                'waiting',
                'under_construction',
                'completed',
                'approved',
                'suspended',
                'cancelled',
            ])->default('waiting');
            $table->unsignedBigInteger('supervisor_id');
            $table->unsignedBigInteger('construction_unit_id');
            $table->foreign('supervisor_id')->references('id')->on('users');
            $table->foreign('construction_unit_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
