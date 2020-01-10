<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Response;
use App\Exceptions\AccountHasBeenLockException;

class IsUnlock
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::user()->is_lock) {
            throw new AccountHasBeenLockException('Tài khoản đã bị khóa');
        }

        return $next($request);
    }
}
