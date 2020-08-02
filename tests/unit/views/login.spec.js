import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import Login from '@/views/Login.vue';
import { MESSAGE } from '@/utils/constant/message.js';
import { buildSnackBarMessage } from '@/utils/commonUtils.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login.vue', () => {
    let actions;
    let store;
    let mutations;
    let options;
    let $router;

    beforeEach(() => {
        actions = {
            requestKakaoTokenByCode: sinon.stub(),
        };
        mutations = {
            openSnackBar: sinon.spy(),
        };
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    actions,
                },
                common: {
                    namespaced: true,
                    mutations,
                },
            },
        });
        $router = {
            push: sinon.spy(),
        };
        options = {
            store,
            localVue,
            mocks: {
                $router,
                $route: {
                    query: null,
                },
            },
        };
    });

    it('페이지 진입 시 ValidationFail일 경우 openSnackbar를 호출한다.', async () => {
        // given
        options.mocks.$route.query = { validationFail: true };

        // when
        shallowMount(Login, options);

        // then
        expect(mutations.openSnackBar.withArgs({}, buildSnackBarMessage(MESSAGE.LOGIN_REQUIRE)).calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이라면 register로 routing 된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actions.requestKakaoTokenByCode.returns(Promise.resolve(true));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actions.requestKakaoTokenByCode.called).to.be.true;
        expect($router.push.withArgs('/register/profile').calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이 아니라면 main으로 routing 된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actions.requestKakaoTokenByCode.returns(Promise.resolve(false));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actions.requestKakaoTokenByCode.called).to.be.true;
        expect($router.push.withArgs('/main').calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 예외가 발생하면 Snackbar가 호출된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actions.requestKakaoTokenByCode.returns(Promise.reject(Error));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actions.requestKakaoTokenByCode.called).to.be.true;
        expect(mutations.openSnackBar.withArgs({}, buildSnackBarMessage(MESSAGE.LOGIN_FAIL)).calledOnce).to.be.true;
    });
});
