export interface UseCase<TUseCaseRequestPort, TUseCaseDtoResponse> {
  execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse>
}
