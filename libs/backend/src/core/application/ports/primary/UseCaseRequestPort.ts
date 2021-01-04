/**
 * A use case requires a request
 *
 * @remarks
 * Used by {@link CommandQueryBusPort} as the payload
 *
 * @typeParam TRequest - payload type
 * @param request - Incoming request
 */
export interface UseCaseRequestPort<TRequest = {}> {
  request?: TRequest
}
