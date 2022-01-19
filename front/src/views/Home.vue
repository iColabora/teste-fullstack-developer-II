<template>
  <div class="main">
    <div :class="['form-field', preview && 'preview']">
      <div class="box-group">
        <div class="box-label">{{ t('form.id.label') }}</div>
        <InputText
          id="id"
          v-model="form.id"
          type="text"
          :placeholder="t('form.id.placeholder')"
          @input="validateField('id')"
        />
        <div class="message-error">
          <small v-if="error.id" class="p-error">
            {{ t('form.required', { name: t('form.id.label') }) }}
          </small>
        </div>
      </div>

      <div class="box-group">
        <div class="box-label">{{ t('form.label.label') }}</div>
        <InputText
          id="label"
          v-model="form.label"
          type="text"
          :placeholder="t('form.label.placeholder')"
          @input="validateField('label')"
        />
        <div class="message-error">
          <small v-if="error.label" class="p-error">
            {{ t('form.required', { name: t('form.label.label') }) }}
          </small>
        </div>
      </div>

      <div class="box-group">
        <div class="box-label">{{ t('form.type.label') }}</div>
        <Dropdown
          v-model="form.type"
          :placeholder="t('form.type.placeholder')"
          :options="types"
          :option-label="v => t(`types.${v.code}`)"
          option-value="code"
          @change="validateField('type')"
        />
        <div class="message-error">
          <small v-if="error.type" class="p-error">
            {{ t('form.required', { name: t('form.type.label') }) }}
          </small>
        </div>
      </div>

      <div v-if="form.type && form.type === 'combo'" class="box-group">
        <div class="box-label">{{ t('form.options.label') }}</div>
        <Chips
          v-model="form.options"
          @add="isOptsValid"
          @remove="isOptsValid"
        />

        <div class="message-error">
          <small v-if="error.options" class="p-error">
            {{ t('form.options.max', form.options.length) }}
          </small>
        </div>
      </div>

      <div class="actions">
        <div class="action">
          <Button
            class="p-button-outlined p-button-secondary"
            :label="t('form.cancel')"
            @click="cancel"
          />
        </div>
        <div class="action">
          <Button :label="t('form.save')" :loading="saving" @click="save" />
        </div>
      </div>
    </div>

    <div class="fields">
      <div class="fields-header">
        <div class="box-label">{{ t('fields.title') }}</div>
        <div class="show-preview" @click="handlePreview">
          <i :class="['pi', !preview ? 'pi-eye' : 'pi-eye-slash']" />
        </div>
      </div>
      <draggable
        v-model="fields"
        item-key="uid"
        group="fields"
        tag="transition-group"
        :component-data="{ name: 'fade' }"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <div class="field">
            <div class="box-label">{{ element.label }}</div>
            <div class="box-group" @click="edit(element)">
              <Dropdown
                v-if="element.type === 'combo'"
                :id="element.id"
                :options="element.options"
                :placeholder="element.label"
                :disabled="!preview"
              />
              <InputText
                v-else
                :id="element.id"
                type="text"
                :placeholder="element.label"
                :disabled="!preview"
              />

              <div
                v-if="!preview"
                class="destroy"
                :class="{ pending: confirmDestroy === element.uid }"
                @click.stop="destroy(element.uid)"
              >
                <i class="pi pi-trash" />
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import draggable from 'vuedraggable';

import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Chips from 'primevue/chips';
import Button from 'primevue/button';

import { useStore } from '@/store';
import { IField } from '@/store/fields/state';

type Props = keyof IField;

export default defineComponent({
  name: 'PageHome',

  components: {
    draggable,
    InputText,
    Dropdown,
    Chips,
    Button,
  },

  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { state, dispatch } = useStore();

    const types = [
      { name: 'Text', code: 'text' },
      { name: 'Big Text', code: 'bigtext' },
      { name: 'Combo', code: 'combo' },
    ];

    const enabled = ref(true);
    const dragging = ref(true);
    const preview = ref(false);
    const deleting = ref(false);
    const confirmDestroy = ref<string | null>();
    const interval = ref<number | null>();
    const saving = ref(false);

    const form = ref<IField>({
      uid: null,
      id: null,
      label: null,
      type: null,
      order: null,
      options: [],
    });

    const error = ref({
      uid: false,
      id: false,
      label: false,
      type: false,
      order: false,
      options: false,
    });

    onMounted(() => {
      dispatch('fields/index');
    });

    const fields = computed(() => state.fields.list);

    const hasError = computed(() => !validate());

    const canCancel = computed(() => {
      const val = form.value;
      return val.id || val.label || val.type;
    });

    const canSave = computed(() => {
      const val = form.value;
      return val.id && val.label && val.type;
    });

    const draggingInfo = computed(() => (dragging.value ? 'under drag' : ''));

    const handlePreview = () => {
      preview.value = !preview.value;
    };

    const isOptsValid = (): boolean => {
      const len = form.value.options.length;
      const isValid = len >= 1 && 3 >= len;
      error.value.options = !isValid;
      return isValid;
    };

    const validate = (): boolean => {
      let valid = true;
      Object.keys(form.value).forEach(key => {
        const prop = key as Props;
        if (['id', 'label', 'type'].includes(prop)) {
          if (!form.value[prop]) {
            valid = false;
            error.value[prop] = !form.value[prop];
          }
        }
      });

      if (form.value.type === 'combo') {
        valid = valid && isOptsValid();
      }

      return valid;
    };

    const validateField = (prop: Props): void => {
      error.value[prop] = !form.value[prop];
    };

    const clearErrors = (): void => {
      Object.keys(form.value).forEach(key => {
        const prop = key as Props;
        error.value[prop] = false;
      });
    };

    const edit = (item: IField): void => {
      if (preview.value) return;

      form.value = {
        uid: item.uid,
        id: item.id,
        label: item.label,
        type: item.type,
        order: item.order,
        options: item.options,
      };
    };

    const destroy = (uid: string): void => {
      if (!uid) return;

      if (!confirmDestroy.value) {
        confirmDestroy.value = uid;

        interval.value = setInterval(() => {
          confirmDestroy.value = null;
          interval.value = null;
        }, 3000);
        return;
      }

      if (confirmDestroy.value !== uid) return;

      deleting.value = true;

      dispatch('fields/delete', uid)
        .then(() => {
          deleting.value = false;
          cancel();
        })
        .catch(e => {
          deleting.value = false;
          throw e;
        });
    };

    const cancel = (): void => {
      form.value = {
        uid: null,
        id: null,
        label: null,
        type: null,
        order: null,
        options: [],
      };
      clearErrors();
    };

    const save = async (): Promise<void> => {
      const isValid = validate();
      console.log(isValid);
      if (!isValid) return;

      saving.value = true;

      if (form.value.uid) {
        dispatch('fields/update', form.value)
          .then(() => {
            saving.value = false;
            cancel();
          })
          .catch(e => {
            saving.value = false;
            throw e;
          });
        return;
      }

      form.value.order = fields.value.length;

      dispatch('fields/create', form.value)
        .then(() => {
          saving.value = false;
          cancel();
        })
        .catch(e => {
          saving.value = false;
          throw e;
        });
    };

    const checkMove = (e: any) => {
      console.log('Future index: ' + e.draggedContext.futureIndex);
    };

    return {
      t,
      enabled,
      dragging,
      draggingInfo,
      saving,
      fields,
      types,
      form,
      error,
      hasError,
      validateField,
      isOptsValid,
      canCancel,
      cancel,
      canSave,
      confirmDestroy,
      destroy,
      edit,
      save,
      preview,
      handlePreview,
      checkMove,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  column-gap: 20px;

  padding: 20px;

  .box-group {
    width: 200px;

    .p-dropdown {
      width: 200px;
    }

    .label {
      margin-bottom: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .message-error {
      height: 10px;
    }
  }

  .form-field {
    padding: 24px;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &.preview {
      opacity: 0.7;
      pointer-events: none;
    }

    .box-group {
      &:not(:first-child) {
        margin-top: 20px;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      column-gap: 6px;
      margin-top: 24px;

      .action {
        width: 100%;

        button {
          width: 100%;
        }
      }
    }
  }

  .fields {
    min-width: 260px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    border: 1px solid rgba(0, 0, 0, 0.1);

    .field {
      &:hover {
        .pi-trash {
          opacity: 1;
        }
      }

      .box-label {
        margin-top: 20px;
      }

      .box-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 8px;
        width: 100%;

        .destroy {
          cursor: pointer;
          &.pending {
            color: #eed556;
          }

          .pi-trash {
            opacity: 0.7;
          }
        }
      }
    }

    .fields-header {
      display: flex;
      justify-content: space-between;

      .show-preview {
        cursor: pointer;
      }
    }
  }
}
</style>
