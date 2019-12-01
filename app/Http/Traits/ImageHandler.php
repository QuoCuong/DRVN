<?php

namespace App\Http\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait ImageHandler
{
    public function uploadImage(UploadedFile $image, $path)
    {
        $path = 'public/upload/image/' . $path;

        return $image->store($path);
    }

    public function deleteImage($path)
    {
        $parseUrl = parse_url($path);

        if (!isset($parseUrl['scheme'])) {
            $delete_path = 'public/' . ltrim($path, '\/storage');

            return Storage::delete($delete_path);
        }
    }

    public function normalizeImageName($name)
    {
        return str_replace(' ', '_', ucwords($name));
    }
}
