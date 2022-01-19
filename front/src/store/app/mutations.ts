import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {
  setLocale(state, payload: string) {
    state.locale = payload;
  },
};

export default mutation;
