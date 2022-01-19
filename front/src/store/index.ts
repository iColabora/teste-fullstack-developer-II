import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';

import { AppStateInterface } from './app/state';
import app from './app';
import { FieldsStateInterface } from './fields/state';
import fields from './fields';

export interface StateInterface {
  app: AppStateInterface;
  fields: FieldsStateInterface;
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol('vuex-key');

const store = createStore<StateInterface>({
  modules: {
    app,
    fields,
  },

  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: !!process.env.DEBUGGING,
});

export function useStore(
  injectKey?: InjectionKey<VuexStore<StateInterface>> | string
): VuexStore<StateInterface> {
  return vuexUseStore(injectKey || storeKey);
}

export default store;
