import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class UserApi {
    getKakaoProfile() {
        return axios.get('/api/users/kakao-profile')
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.converterProfile);
    }

    postRegister(registerRequestDto) {
        return axios.post('/api/users/regist', registerRequestDto)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getRegisterStatus(appToken) {
        return axios.get('/api/users/registStatus', { params: appToken })
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getUserProfile() {
        return axios.get('/api/users/profile')
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getUserRegions() {
        return axios.get('/api/users/regions')
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertUserRegions);
    }

    putUserRegions(userRegionsChangeDto) {
        return axios.put('/api/users/regions', userRegionsChangeDto);
    }

    gettUserInterest() {
        return axios.get('/api/users/interests')
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertUserInterests);
    }

    putUserInterests(userInterestsChangeDto) {
        return axios.put('/api/users/interests', userInterestsChangeDto);
    }
}

const userApi = new UserApi();
export default userApi;
