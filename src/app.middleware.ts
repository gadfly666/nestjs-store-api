import { Injectable, NestMiddleware, Logger} from '@nestjs/common';
// import { Logger } from 'winston';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';``
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {

  private readonly logger = new Logger(RequestLogMiddleware.name);

  constructor(
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger 
  ){}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, path: url } = req;

    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      // TODO access log best practices
      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}
