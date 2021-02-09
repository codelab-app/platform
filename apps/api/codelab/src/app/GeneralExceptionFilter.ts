import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { CodelabError } from './CodelabError'
import { CodelabPrismaError } from './CodelabPrismaError'

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  public logger: Logger = new Logger('GeneralExceptionFilter')

  catch(exception: any, host: ArgumentsHost): any {
    if (
      exception instanceof CodelabPrismaError ||
      exception instanceof CodelabError
    ) {
      this.logger.error(exception.toString())
    }
  }
}
