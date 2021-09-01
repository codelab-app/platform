import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'

@Catch()
// extends BaseExceptionFilter
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger = new Logger('AllExceptionsFilter')

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception.toString())
    // super.catch(exception, host)
  }
}

// @Catch()
// export class AllExceptionsFilter implements GqlExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     console.log('exception here!')
//     console.log(exception, host)
//
//     const gqlHost = GqlArgumentsHost.create(host)
//
//     return exception
//   }
// }

// @Catch()
// export class AllExceptionsFilter extends BaseExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     console.log(exception, host)
//
//     const ctx = host.switchToHttp()
//     const response = ctx.getResponse()
//     // const request = ctx.getRequest();
//     // const status = exception.getStatus();
//     let status = HttpStatus.INTERNAL_SERVER_ERROR
//
//     const message =
//       exception instanceof Error ? exception.message : exception.message.error
//
//     if (exception.status === HttpStatus.NOT_FOUND) {
//       status = HttpStatus.NOT_FOUND
//     }
//
//     if (exception.status === HttpStatus.SERVICE_UNAVAILABLE) {
//       status = HttpStatus.SERVICE_UNAVAILABLE
//     }
//
//     if (exception.status === HttpStatus.NOT_ACCEPTABLE) {
//       status = HttpStatus.NOT_ACCEPTABLE
//     }
//
//     if (exception.status === HttpStatus.EXPECTATION_FAILED) {
//       status = HttpStatus.EXPECTATION_FAILED
//     }
//
//     if (exception.status === HttpStatus.BAD_REQUEST) {
//       status = HttpStatus.BAD_REQUEST
//     }
//
//     response.status(status).json({
//       status,
//       success: false,
//       data: [],
//       error: message,
//       message:
//         status === HttpStatus.INTERNAL_SERVER_ERROR
//           ? 'Sorry we are experiencing technical problems.'
//           : '',
//     })
//   }
// }
