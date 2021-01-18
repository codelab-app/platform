import { Injectable, Logger } from '@nestjs/common'
import { ICommand, Saga } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { CreatePageSuccessCommand } from '../commands/CreatePageSuccessCommand'
import { AssignGraphToPageSuccessEvent } from '../useCases/createPage/AssignGraphToPageSuccessEvent'
import { AssignPageToAppSuccessEvent } from '../useCases/createPage/AssignPageToAppSuccessEvent'

@Injectable()
export class PageCreateSuccessSaga {
  private logger: Logger = new Logger('PageCreateSuccessSaga')

  @Saga()
  pageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      filter(
        (x) =>
          x instanceof AssignPageToAppSuccessEvent ||
          x instanceof AssignGraphToPageSuccessEvent,
      ),
      map(
        (
          event: AssignPageToAppSuccessEvent | AssignGraphToPageSuccessEvent,
        ) => {
          this.logger.log('Page created success')

          return new CreatePageSuccessCommand()
        },
      ),
    )
  }
}
