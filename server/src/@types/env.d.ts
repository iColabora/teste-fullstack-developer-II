declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    APP_PORT: string;
  }
}
