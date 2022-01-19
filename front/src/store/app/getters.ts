import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

const getters: GetterTree<AppStateInterface, StateInterface> = {
  languages(state) {
    return state.languages;
  },

  locale(state) {
    return state.locale;
  },
};

export default getters;
