import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { CreatePageSuccessCommand } from '../commands/CreatePageSuccessCommand'
import { AssignGraphToPageSuccessEvent } from '../useCases/createPage/AssignGraphToPageSuccessEvent'
import { AssignPageToAppSuccessEvent } from '../useCases/createPage/AssignPageToAppSuccessEvent'

@Injectable()
export class PageSaga {
  @Saga()
  pageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return combineLatest([
      events$.pipe(
        ofType(AssignPageToAppSuccessEvent),
        map((event) => {
          return event
        }),
      ),
      events$.pipe(
        ofType(AssignGraphToPageSuccessEvent),
        map((event) => {
          return event
        }),
      ),
    ]).pipe(
      map(([assignPageToAppSuccessEvent, assignGraphToPageSuccessEvent]) => {
        const { page } = assignGraphToPageSuccessEvent

        return new CreatePageSuccessCommand(page)
      }),
    )
  }
}
