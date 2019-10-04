@extends('admin.layouts.app')

@section('body')

<body class="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
    <div class="loader">
        <i class="fa fa-spinner fa-spin fa-5x"></i>
    </div>
    <div id="app"></div>
</body>

<script src="/vendors/@coreui/coreui-plugin-chartjs-custom-tooltips/js/custom-tooltips.min.js"></script>
<script>
    window.sessionStorage.setItem('accessToken', '{{ JWTAuth::fromUser(auth()->user()) }}')
</script>
@endsection
