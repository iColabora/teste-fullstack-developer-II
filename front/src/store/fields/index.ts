import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { FieldsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const module: Module<FieldsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default module;
