import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotEnvInit from './dotenv.config';
import { IEnv } from 'env-var';
import * as env from 'env-var';

const MIGRATIONS_DIR = 'migrations';

class ConfigService {
  static useDotEnvValues() {
    dotEnvInit();
    return new ConfigService(env.from(process.env));
  }

  constructor(private config: IEnv<any, any>) {
    this.init(this.config);
  }

  private init(config: IEnv<any, any>) {
    config.get('ENVIRONMENT').asEnum(['dev', 'production', 'test']);
    config
      .get('PORT')
      .required()
      .asPortNumber();
    config.get('RUN_MIGRATIONS').asBool();
    // config.get('POSTGRES_URL').asUrlString();
    config
      .get('POSTGRES_HOST')
      .required()
      .asString();
    config
      .get('POSTGRES_PORT')
      .required()
      .asPortNumber();
    config
      .get('POSTGRES_USER')
      .required()
      .asString();
    config
      .get('POSTGRES_PASSWORD')
      .required()
      .asString();
    config
      .get('POSTGRES_DATABASE')
      .required()
      .asString();
  }

  public getValue(key: string, defaultValue?: any): string {
    return this.config.get(key, defaultValue).asString();
  }

  public getPort() {
    return this.config
      .get('PORT')
      .required()
      .asPortNumber();
  }

  public isProduction() {
    const mode = this.config.get('ENVIRONMENT').asString();
    return mode !== 'dev';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config
        .get('POSTGRES_HOST')
        .required()
        .asString(),
      port: this.config
        .get('POSTGRES_PORT')
        .required()
        .asPortNumber(),
      username: this.config
        .get('POSTGRES_USER')
        .required()
        .asString(),
      password: this.config
        .get('POSTGRES_PASSWORD')
        .required()
        .asString(),
      database: this.config
        .get('POSTGRES_DATABASE')
        .required()
        .asString(),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: [`${MIGRATIONS_DIR}/*.ts`],
      cli: {
        migrationsDir: MIGRATIONS_DIR,
      },
      ssl: this.isProduction(),
      synchronize: !this.isProduction(),
      // https://github.com/typeorm/typeorm/blob/master/docs/logging.md
      logging: ['error', 'warn', 'info', 'schema'], // 'schema', 'log', 'query'
      // maxQueryExecutionTime: 1000, // log queries that take too much time to execution
    };
  }

  public getOlxConfig(): any {
    const filterQuery = '?search%5Bfilter_float_price%3Ato%5D=25000&search%5Bfilter_float_number_of_rooms%3Afrom%5D=3&currency=USD';
    return {
      crawlerUrl: `https://www.olx.ua/nedvizhimost/kvartiry-komnaty/prodazha-kvartir-komnat/krivoyrog/${filterQuery}`,
    };
  }
}

const configService = ConfigService.useDotEnvValues();

export { configService };
