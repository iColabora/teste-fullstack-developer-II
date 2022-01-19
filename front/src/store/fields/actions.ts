import { ActionTree } from 'vuex';

import { retry } from '@/services/axios';

import { StateInterface } from '../index';
import { FieldsStateInterface, IField } from './state';

const actions: ActionTree<FieldsStateInterface, StateInterface> = {
  async index({ commit }) {
    const fields = await retry<IField[]>({
      url: '/fields',
    });

    commit('fields/set', fields.data, { root: true });
    return fields.data;
  },

  async create({ commit }, payload: IField) {
    const { uid, ...data } = payload;
    const field = await retry<IField>({
      url: '/fields',
      options: {
        method: 'POST',
        data,
      },
    });

    commit('fields/create', field.data, { root: true });
    return field.data;
  },

  async update({ commit }, payload: IField) {
    const { uid, ...data } = payload;
    const field = await retry<IField>({
      url: `/fields/${uid}`,
      options: {
        method: 'PUT',
        data,
      },
    });

    commit('fields/update', payload, { root: true });
    return field.data;
  },

  async delete({ commit }, payload: IField) {
    await retry<IField>({
      url: `/fields/${payload}`,
      options: {
        method: 'DELETE',
      },
    });

    commit('fields/delete', payload, { root: true });
  },
};

export default actions;
