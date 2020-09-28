import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import UserLocationPriority from '@/components/UserLocationPriority.vue';
import { testUtils } from '../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserLocationPriority.vue', () => {
    let gettersHelper;
    let options;
    let $router;

    beforeEach(() => {
        const mockContext = testUtils.mockingAll(sandbox);
        gettersHelper = mockContext.gettersMock;
        $router = {
            push: sinon.spy(),
            back: sinon.spy(),
        };
        options = {
            localVue,
            mocks: {
                $router,
            },
        };
    });

    afterEach(() => { sandbox.restore(); });

    it('prioritySize는 3이다.', () => {
        // given
        gettersHelper.selectedLocations.returns([]);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);

        // then
        expect(wrapper.vm.prioritySize).to.be.equals(3);
    });

    it('priority와 매칭되는 selectedLocation이 존재하면 getColor는 green을 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        gettersHelper.selectedLocations.returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const color = wrapper.vm.getColor(1);

        // then
        expect(color).to.be.equals('green');
    });

    it('priority와 매칭되는 selectedLocation이 존재하지 않으면 getColor는 black을 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        gettersHelper.selectedLocations.returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const color = wrapper.vm.getColor(3);

        // then
        expect(color).to.be.equals('black');
    });

    it('priority와 매칭되는 selectedLocation이 존재하면 getText는 선택된 location의 name을 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        gettersHelper.selectedLocations.returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const text = wrapper.vm.getText(1);

        // then
        expect(text).to.be.equals(selectedLocations[1].name);
    });

    it('priority와 매칭되는 selectedLocation이 존재하면 getText는 선택된 location의 name이 겹치면 잘라서 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '세종특별자치시/세종특별자치시' } };
        gettersHelper.selectedLocations.returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const text = wrapper.vm.getText(1);

        // then
        expect(text).to.be.equals('세종특별자치시');
    });

    it('priority와 매칭되는 selectedLocation이 존재하지 않으면 getText는 우선순위를 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        gettersHelper.selectedLocations.returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const text = wrapper.vm.getText(3);

        // then
        expect(text).to.be.equals('우선순위 3');
    });
});
