import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
// import { Logger } from 'winston';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
class SystemExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(SystemExceptionFilter.name);

  constructor(
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
    // private readonly logger: Logger
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    this.logger.error(`Exceptions: ${exception}`)

    if (exception instanceof HttpException) {
      
      const response = (exception.getResponse() instanceof Object) ? <Object> exception.getResponse() : {statusCode: exception.getStatus(), message: exception.message} 

      ctx.getResponse<Response>()
      .status(exception.getStatus())
      .json({
        ...response,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url,
      });
      return;
    } 

    ctx.getResponse<Response>()
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Internal Server Error",
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url,
      });
  }
}

export {
  SystemExceptionFilter
}
