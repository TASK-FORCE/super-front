import store from '@/store';
import { COMMON, IS_LOADING, SNACKBAR_OPTIONS } from '@/store/type/common_type.js';
import { ROOT_INTERESTS, ROOT_REGIONS, TEMPLATE } from '@/store/type/template_type.js';
import { KAKAO_PROFILE, SELECTED_INTEREST_SEQS, SELECTED_REGIONS, USER, USER_PROFILE } from '@/store/type/user_type.js';
import { AUTH } from '@/store/type/auth_type.js';
import { CLUB_LIST, CLUB_LIST_MODULE, CLUB_PAGE, CLUB_SEARCH_FILTER_INFO, MY_CLUB_LIST, MY_CLUB_PAGE } from '@/store/type/club_list_type.js';
import { CLUB, CLUB_DATA, CLUB_NAME } from '@/store/type/club_type.js';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';

const { getters } = store;

const gettersHelper = {
    // auth module
    isAuth: () => get(AUTH, 'isAuth'),
    appToken: () => get(AUTH, 'appToken'),

    // club module
    clubData: () => get(CLUB, CLUB_DATA),
    clubName: () => get(CLUB, CLUB_NAME),

    // clubList module
    clubList: () => get(CLUB_LIST_MODULE, CLUB_LIST),
    clubPage: () => get(CLUB_LIST_MODULE, CLUB_PAGE),
    myClubList: () => get(CLUB_LIST_MODULE, MY_CLUB_LIST),
    myClubPage: () => get(CLUB_LIST_MODULE, MY_CLUB_PAGE),
    clubSearchFilterInfo: () => get(CLUB_LIST_MODULE, CLUB_SEARCH_FILTER_INFO),

    // common module
    isLoading: () => get(COMMON, IS_LOADING),
    snackBarOptions: () => get(COMMON, SNACKBAR_OPTIONS),

    // template module
    rootRegions: () => get(TEMPLATE, ROOT_REGIONS),
    rootInterests: () => get(TEMPLATE, ROOT_INTERESTS),

    // user module
    kakaoProfile: () => get(USER, KAKAO_PROFILE),
    selectedRegions: () => get(USER, SELECTED_REGIONS),
    selectedInterestSeqs: () => get(USER, SELECTED_INTEREST_SEQS),
    userProfile: () => get(USER, USER_PROFILE),
};

const get = (moduleName, getterName) => getters[combineWithModuleName(moduleName, getterName)];

export { gettersHelper };
