import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { PageCreatedEvent } from '../../../../../page/src/core/application/useCases/createPage/PageCreatedEvent'
import { AddPageToAppCommand } from '../commands/AddPageToAppCommand'

@Injectable()
export class AppPageSaga {
  @Saga()
  pageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PageCreatedEvent),
      map((event: PageCreatedEvent) => {
        return new AddPageToAppCommand(event.app, event.page)
      }),
    )
  }
}
