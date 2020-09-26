import _ from '@/utils/lodashWrapper.js';
import store from '@/store';
import router from '@/router';
import { getterHelper } from '@/store/helper/getterHelper.js';
import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';
import { REQUEST_INTEREST_TEMPLATE, REQUEST_LOCATION_TEMPLATE, TEMPLATE } from '@/store/type/template_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { combineWithModuleName } from '@/store/helper/vuexUtils.js';

const actionsFetcherService = {
    async fetchInterestAndLocationTemplate(withLoading, routePathWhenFail) {
        if (!_.isEmpty(getterHelper.rootLocations()) && !_.isEmpty(getterHelper.rootInterests())) {
            return;
        }

        let locationsPromise;
        let interestsPromise;

        if (withLoading) {
            store.commit(combineWithModuleName(COMMON, CHANGE_LOADING), true);
        }

        if (_.isEmpty(getterHelper.rootLocations())) {
            locationsPromise = store.dispatch(combineWithModuleName(TEMPLATE, REQUEST_LOCATION_TEMPLATE));
        }

        if (_.isEmpty(getterHelper.rootInterests())) {
            interestsPromise = store.dispatch(combineWithModuleName(TEMPLATE, REQUEST_INTEREST_TEMPLATE));
        }

        try {
            await Promise.all([locationsPromise, interestsPromise]);
        } catch (e) {
            console.warn(e);
            let catchPromise = Promise.resolve();
            if (routePathWhenFail) {
                catchPromise = router.push(routePathWhenFail);
            }
            catchPromise.then(() => mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY));
        } finally {
            if (withLoading) {
                store.commit(combineWithModuleName(COMMON, CHANGE_LOADING), false);
            }
        }
    },
};

export { actionsFetcherService };
