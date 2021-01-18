import { Injectable } from '@nestjs/common'
import { ReplaySubject, combineLatest } from 'rxjs'
import { AssignGraphToPageSuccessEvent } from '../../../../modules/page/src/core/application/useCases/createPage/AssignGraphToPageSuccessEvent'
import { AssignPageToAppSuccessEvent } from '../../../../modules/page/src/core/application/useCases/createPage/AssignPageToAppSuccessEvent'

@Injectable()
export class CodelabEventsService {
  private _$assignGraphToPageSuccessEvent: ReplaySubject<AssignGraphToPageSuccessEvent> = new ReplaySubject<AssignGraphToPageSuccessEvent>(
    1,
    1000,
  )

  private _$assignPageToAppSuccessEvent: ReplaySubject<AssignPageToAppSuccessEvent> = new ReplaySubject<AssignPageToAppSuccessEvent>(
    1,
    1000,
  )

  get $assignGraphToPageSuccessEvent() {
    return this._$assignGraphToPageSuccessEvent.asObservable()
  }

  get $assignPageToAppSuccessEvent() {
    return this._$assignPageToAppSuccessEvent.asObservable()
  }

  setAssignGraphToPageSuccessEvent(event: AssignGraphToPageSuccessEvent) {
    this._$assignGraphToPageSuccessEvent.next(event)
  }

  setAssignPageToAppSuccessEvent(event: AssignPageToAppSuccessEvent) {
    this._$assignPageToAppSuccessEvent.next(event)
  }

  getBothPageEvents() {
    return combineLatest([
      this.$assignGraphToPageSuccessEvent,
      this.$assignPageToAppSuccessEvent,
    ])
  }
}
