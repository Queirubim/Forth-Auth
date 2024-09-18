import { HashingService } from './hashing.service';
import * as bcrypt from 'bcrypt';

export class BcryptService extends HashingService {
  async hash(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  async compare(password: string, passwordHash: string) {
    // --Note-- a ordem faz diferença no bcrypt.compareSync
    return bcrypt.compare(password, passwordHash);
  }
}
