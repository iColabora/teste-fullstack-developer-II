import axiosInstace, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { useToast } from 'vue-toastification';
import i18n from '@/i18n';

interface RetryProps {
  axios?: AxiosInstance;
  url: string;
  options?: AxiosRequestConfig;
  retries?: number;
  attempt?: number;
}

const defaultRetries = window.location.href.match(/(localhost)/g) ? 0 : 4;

export const api = axiosInstace.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export const retry = async <T>({
  axios = api,
  url,
  options,
  retries = defaultRetries,
  attempt = 0,
}: RetryProps): Promise<AxiosResponse<T>> => {
  try {
    return await axios.request<T>({ url, ...options });
  } catch (error) {
    if (attempt >= retries) {
      const err = error as AxiosError;
      const code = ((err.response && err.response.data.code) ||
        err.message) as string;

      if (err.response && err.response.data) {
        const { t, te } = i18n.global;
        const toast = useToast();

        if (te(`toast.${code}`)) {
          toast.error(t(`toast.${code}`));
        }
      }
      throw error;
    }

    return retry<T>({
      axios,
      url,
      options,
      retries,
      attempt: attempt + 1,
    });
  }
};

export default axiosInstace;
