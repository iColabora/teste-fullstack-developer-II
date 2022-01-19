export interface AppStateInterface {
  locale: string;
  languages: string[];
}

function state(): AppStateInterface {
  return {
    languages: ['pt-BR', 'en-US'],
    locale: 'pt-BR',
  };
}

export default state;
