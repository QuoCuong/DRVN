<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <script>
        window.Laravel = {
            baseUrl: '{!! url('/') !!}',
            csrfToken: '{{ csrf_token() }}'
        }
    </script>
</head>

<body>
    <div class="loader">
        <i class="fa fa-spinner fa-spin fa-5x"></i>
    </div>
    <div id="app">
        @yield('content')
    </div>
</body>

</html>
