

type EnviromentsName = 'VITE_API_BACKEND_URL';

const REQUIRED_VARIABLES: EnviromentsName[] = [
  'VITE_API_BACKEND_URL',
];

export const getEnviroments = (): Record<EnviromentsName, string> => {

    const enviromenets = import.meta.env as Record<string, string>;

    for (const variable of REQUIRED_VARIABLES) {
        if (!enviromenets[variable]) {
            throw new Error(`Environment variable ${variable} is required but not defined.`);
        }
    }
    
  return enviromenets;
}
