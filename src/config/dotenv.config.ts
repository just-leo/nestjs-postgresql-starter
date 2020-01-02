import { config as loadDotEnvValues } from 'dotenv';

export default function load() {
  // returned values are the only ones from .env config
  const dotEnvValues = loadDotEnvValues({ debug: !!process.env.DEBUG });

  if (dotEnvValues.error) {
    throw dotEnvValues.error;
  }

  return dotEnvValues;
}
