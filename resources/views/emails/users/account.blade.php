<body class="app flex-row align-items-center  pace-done">
    <div class="pace  pace-inactive">
        <div class="pace-progress" data-progress-text="100%" data-progress="99"
            style="transform: translate3d(100%, 0px, 0px);">
            <div class="pace-progress-inner"></div>
        </div>
        <div class="pace-activity"></div>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="clearfix">
                    <h1>Welcome!</h1>
                    <h4 class="pt-3">Tài khoản đăng nhập của bạn là</h4>
                    <p class="text-muted">Địa chỉ email: {{ $email }}</p>
                    <p class="text-muted">Mật khẩu: {{ $password }}</p>
                </div>
            </div>
        </div>
    </div>
</body>
