import { NestMiddleware, Injectable, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  private readonly logger: Logger = new Logger(AuthMiddleware.name);

  constructor(
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    this.logger.warn(req.body);
    this.logger.debug('Request logged');
    // return jwt({
    //   secret: jwtConstants.secret,
    //   audience: 'http://localhost:3000/',
    //   // issuer: 'https://${CLIENT_DOMAIN}/',
    //   algorithm: 'RS256',
    // });
    next();
  }
}
