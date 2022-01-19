import { MutationTree } from 'vuex';
import { FieldsStateInterface, IField } from './state';

const mutation: MutationTree<FieldsStateInterface> = {
  set(state, payload: IField[]) {
    state.list = payload;
  },

  create(state, payload: IField) {
    state.list.push(payload);
  },

  update(state, payload: IField) {
    const index = state.list.findIndex(f => f.uid === payload.uid);

    state.list[index] = payload;
  },

  delete(state, payload: string) {
    const index = state.list.findIndex(f => f.uid === payload);

    state.list = state.list.filter((_, i) => i !== index);
  },
};

export default mutation;
