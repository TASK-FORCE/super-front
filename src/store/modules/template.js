import { requestInterestTemplate, requestLocationTemplate } from '@/apis/template.js';
import { INTERESTS, REQUEST_INTEREST_TEMPLATE, REQUEST_STATE_TEMPLATE, ROOT_STATES, SET_INTEREST_TEMPLATE, SET_LOCATION_TEMPLATE } from '@/store/type/template_type.js';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/helper/helper.js';

const state = {
    [ROOT_STATES]: [],
    [INTERESTS]: [],
};

const getters = {
    [ROOT_STATES](state) {
        return state[ROOT_STATES];
    },
    [INTERESTS](state) {
        return state[INTERESTS];
    },
};

const mutations = {
    [SET_LOCATION_TEMPLATE](state, rootStates) {
        state[ROOT_STATES] = rootStates;
    },
    [SET_INTEREST_TEMPLATE](state, interests) {
        state[INTERESTS] = interests;
    },
};

const actions = {
    async [REQUEST_STATE_TEMPLATE]({ commit }, withLoading = false) {
        const callback = async () => {
            const response = await requestLocationTemplate();
            const rootStates = response.data;
            commit(SET_LOCATION_TEMPLATE, rootStates);
        };
        if (withLoading) {
            return actionsNormalTemplate(callback);
        }
        return actionsLoadingTemplate(commit, callback);
    },
    async [REQUEST_INTEREST_TEMPLATE]({ commit }) {
        actionsLoadingTemplate(commit, async () => {
            const response = await requestInterestTemplate();
            const interests = response.data;
            commit(SET_INTEREST_TEMPLATE, interests);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
