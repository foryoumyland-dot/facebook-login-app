// تهيئة Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: '763797043146446',  // App ID الخاص بك
        cookie: true,
        xfbml: true,
        version: 'v18.0'
    });
};

// دالة تسجيل الدخول
function loginWithFacebook() {
    FB.login(function(response) {
        if (response.authResponse) {
            // تم التسجيل بنجاح
            getUserInfo();
        } else {
            // المستخدم ألغى التسجيل
            alert('تم إلغاء التسجيل');
        }
    }, {scope: 'public_profile,email'});
}

// الحصول على معلومات المستخدم
function getUserInfo() {
    FB.api('/me', {fields: 'name,email,picture'}, function(response) {
        document.getElementById('userInfo').innerHTML = `
            <h3>مرحباً ${response.name}! 🎉</h3>
            <p>البريد الإلكتروني: ${response.email || 'غير متوفر'}</p>
            <img src="${response.picture.data.url}" width="100" style="border-radius:50%">
            <p><button onclick="logout()">تسجيل الخروج</button></p>
        `;
        document.getElementById('userInfo').style.display = 'block';
    });
}

// دالة تسجيل الخروج
function logout() {
    FB.logout(function(response) {
        document.getElementById('userInfo').style.display = 'none';
        alert('تم تسجيل الخروج');
    });
}

// تحقق من حالة التسجيل عند تحميل الصفحة
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getUserInfo();
        }
    });
}
