import config from '../src/config';
import * as fs from 'fs';

const fileName = 'ormconfig.json';
const { typeOrmConfig } = config();

fs.writeFileSync(
  fileName,
  JSON.stringify(typeOrmConfig, null, 2),
);
