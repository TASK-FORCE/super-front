import Kakao from './sdk.js';

function moveToKakaoLoginPage() {
    if (!Kakao.isInitialized()) {
        Kakao.init(process.env.VUE_APP_KAKAO_JS_APP_KEY);
    }
    Kakao.Auth.authorize({
        redirectUri: KAKAO.REDIRECT_URL,
    });
}

const KAKAO = {
    ACCESS_TOKEN: 'kakaoAccessToken',
    REFRESH_TOKEN: 'kakaoRefreshToken',
    REDIRECT_URL: `${window.location.protocol}//${window.location.host}/login`,
};

export {
    moveToKakaoLoginPage,
    KAKAO,
};