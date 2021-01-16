import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  public logger: Logger = new Logger('GeneralExceptionFilter')

  catch(exception: any, host: ArgumentsHost): any {
    this.logger.error(exception)
  }
}
