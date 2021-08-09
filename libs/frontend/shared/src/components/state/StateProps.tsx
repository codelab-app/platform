export interface StateProps {
  /**
   * Unique identifier for the state. Two State elements with the same
   * identifier will use the same state
   */
  identifier: string

  /**
   * The event of the child element that will the state handler bind to. Leave out to not pass event handler down
   */
  eventKey?: string

  /**
   * The prop key under which the state will be passed to, leave out to not pass props down
   */
  propKey?: string

  /**
   * A lambda function ID which takes in an object with the shape of:
   * {event: Event, previousState: TState}
   * and must return the next state object
   * Will get called when the event with the specified eventKey is called on the child element
   */
  setterLambda: string
}
