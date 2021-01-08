import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log(exception)
  }
}
