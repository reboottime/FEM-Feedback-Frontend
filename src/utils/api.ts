import axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import helpers from './helpers';

class Axios {
  public interceptors:
    | {
        /**
         * The **Request** interceptor will be call rigth before the `http request`
         * @summary
         * This a useful method especially if you need to send a token on each request.
         */
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        /**
         * The **Response** interceptor will be call rigth before the `http request` is received.
         * @summary
         * This a useful method especially if you need to send a token on each request.
         */
        response: AxiosInterceptorManager<AxiosResponse>;
      }
    | undefined;

  constructor(config: AxiosRequestConfig) {
    return axios.create(config);
  }
}

export class Api extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config);

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);

    this.interceptors?.request.use(
      (param) => {
        const token = helpers.auth.getToken();

        const headers = {
          ...param.headers,
          Authorization: `Bearer ${token}`,
        };

        return { ...param, headers } as AxiosRequestConfig;
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.info(error);
        // handling error
      }
    );

    this.interceptors?.response.use(
      (res) => {
        return res.data.data;
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.info(error);
      }
    );
  }

  public post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.post(url, data, config);
  }

  public patch<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.put(url, data, config);
  }

  public put<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.put(url, data, config);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.get(url, config);
  }
}
