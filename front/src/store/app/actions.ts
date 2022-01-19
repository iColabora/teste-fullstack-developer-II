import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

const actions: ActionTree<AppStateInterface, StateInterface> = {
  setLocale(/* context */) {
    // your code
  },
};

export default actions;
