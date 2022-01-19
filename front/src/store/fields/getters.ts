import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { FieldsStateInterface } from './state';

const getters: GetterTree<FieldsStateInterface, StateInterface> = {
  list: state => state.list,
};

export default getters;
