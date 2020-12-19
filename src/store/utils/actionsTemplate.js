import _ from '@/utils/common/lodashWrapper.js';
import { MODULE } from '@/store/type/type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';

export const actionsLoadingTemplate = async (commitInfo, callback, failCallback) => {
    const { commit, commitName, useRootCommit } = extractCommitInfo(commitInfo);
    try {
        commit(commitName, true, { root: useRootCommit });
        return await callback();
    } catch (e) {
        return handleException(e, failCallback);
    } finally {
        commit(commitName, false, { root: useRootCommit });
    }
};

export const actionsNormalTemplate = async (callback, failCallback) => {
    try {
        return await callback();
    } catch (e) {
        return handleException(e, failCallback);
    }
};

/**
 * commitInfo가 Function일 경우 commitInfo는 commit이며 common loading을 위한 commit 정보들을 반환한다.
 * commitInfo가 Function이 아닐 경우 commitInfo는 commitInfo를 가진 객체로 판단하고 해당 commit 정보들을 반환한다.
 */
function extractCommitInfo(commitInfo) {
    // commitInfo가 Function일 경우 commitInfo가 commit이며 common loading을 위한 commit을 사용한다.
    if (_.isFunction(commitInfo)) {
        return {
            commit: commitInfo,
            commitName: `${MODULE.COMMON}/changeLoading`,
            useRootCommit: true,
        };
    }
    // commitInfo가 Function이 아니라면 각 module에서 정의한 커스텀 commit을 사용한다.
    return {
        commit: commitInfo.commit,
        commitName: commitInfo.name,
        useRootCommit: false,
    };
}

function handleException(e, failCallback) {
    const errorMessageFromServer = extractMessage(e);
    if (errorMessageFromServer) {
        mutationsHelper.openSnackBar(errorMessageFromServer);
    } else {
        mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY);
    }

    if (failCallback) {
        failCallback();
    }
    throw e;
}

function extractMessage(e) {
    if (e && e.response && e.response.data) {
        return e.response.data.message;
    }
    return null;
}
