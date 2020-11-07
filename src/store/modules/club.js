import { requestClubBoardCreate, requestClubCreate, requestClubData, requestClubJoin } from '@/apis/club.js';
import { CLUB_DATA, CLUB_NAME, GET_DEFAULT_CLUB, REQUEST_CLUB_BOARD_CREATE, REQUEST_CLUB_CREATE, REQUEST_CLUB_DATA, REQUEST_CLUB_JOIN, SET_CLUB_DATA } from '@/store/type/club_type.js';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';

const state = {
    [CLUB_DATA]: GET_DEFAULT_CLUB(),
};

const getters = {
    [CLUB_DATA]: (state) => state[CLUB_DATA],
    [CLUB_NAME]: (state) => state[CLUB_DATA].clubInfo.name,
};

const mutations = {
    [SET_CLUB_DATA](state, clubData) {
        state[CLUB_DATA] = clubData;
    },
};

const actions = {
    async [REQUEST_CLUB_DATA]({ commit }, clubSeq) {
        return actionsLoadingTemplate(commit, async () => {
            const response = await requestClubData(clubSeq);
            const clubData = response.data;
            commit(SET_CLUB_DATA, clubData);
        });
    },
    async [REQUEST_CLUB_CREATE]({ commit }, clubCreateInfo) {
        return actionsNormalTemplate(async () => {
            const clubCreateRequestDto = RequestConverter.convertClubCreateInfo(clubCreateInfo);
            await requestClubCreate(clubCreateRequestDto);
        });
    },
    async [REQUEST_CLUB_JOIN]({ commit }, clubSeq) {
        return actionsNormalTemplate(async () => {
            await requestClubJoin(clubSeq);
        });
    },
    async [REQUEST_CLUB_BOARD_CREATE]({ _ }, clubBoardCreateInfo) {
        return actionsNormalTemplate(async () => {
            await requestClubBoardCreate(clubBoardCreateInfo);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
