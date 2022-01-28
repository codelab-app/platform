export interface UseCasePort<TUseCaseRequestPort, TUseCaseDtoResponse> {
  execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse>
}
