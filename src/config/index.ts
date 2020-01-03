/**
 * Module used for validation purposes and also it does type coercion
 * of system environment variables that always are strings
 */
import { config as loadDotEnv } from 'dotenv';
import * as env from 'env-var';

loadDotEnv({ debug: true });

export default () => {
  const environment = env.from(process.env);
  const MIGRATIONS_DIR = 'migrations';
  const NODE_ENV = environment.get('NODE_ENV')
    .asEnum(['dev', 'production', 'test']);
  const isProduction = NODE_ENV === 'production';

  let config = {
    isProduction,
    node_env: NODE_ENV,
    port: environment.get('PORT', '3000')
      .asPortNumber(),
    typeOrmConfig: {
      type: 'postgres',
      host: environment.get('POSTGRES_HOST')
        .required().asString(),
      port: environment.get('POSTGRES_PORT')
        .required().asPortNumber(),
      username: environment.get('POSTGRES_USER')
        .required().asString(),
      password: environment.get('POSTGRES_PASSWORD')
        .required().asString(),
      database: environment.get('POSTGRES_DATABASE')
        .required().asString(),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: environment.get('POSTGRES_MIGRATIONS_TABLE', 'migrations')
        .required().asString(),
      migrations: [`${MIGRATIONS_DIR}/*.ts`],
      cli: {
        migrationsDir: MIGRATIONS_DIR,
      },
      ssl: isProduction,
      synchronize: !isProduction,
      // https://github.com/typeorm/typeorm/blob/master/docs/logging.md
      logging: ['error', 'warn', 'info', 'schema'], // 'schema', 'log', 'query'
      // maxQueryExecutionTime: 1000, // log queries that take too much time to execution
    },
    run_migrations: environment.get('RUN_MIGRATIONS', 'false')
      .asBool(),
    telegramToken: environment.get('TELEGRAM_TOKEN')
      .required().asString(),
    crawlerUrl: environment.get('CRAWLER_URL').required().asUrlString(),
  };

  try {
    if (!isProduction) {
      const local = require('./local');
      config = {
        ...config,
        ...local,
      };
    }
  } catch (err) {
    // @ts-ignore
  }

  return config;
};
