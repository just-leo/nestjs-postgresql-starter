import { configService } from '../src/config/config.service';
import * as fs from 'fs';

const fileName = 'ormconfig.json';

fs.writeFileSync(
  fileName,
  JSON.stringify(configService.getTypeOrmConfig(), null, 2)
);
