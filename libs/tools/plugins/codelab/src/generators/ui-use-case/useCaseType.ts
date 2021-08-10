export enum UseCaseType {
  Create = 'create',
  Update = 'update',
  Get = 'get',
  Gets = 'gets',
  Delete = 'delete',
}

export const useCaseTypeToPresentParticle: Record<UseCaseType, string> = {
  [UseCaseType.Create]: 'creating',
  [UseCaseType.Update]: 'updating',
  [UseCaseType.Delete]: 'deleting',
  [UseCaseType.Get]: 'getting',
  [UseCaseType.Gets]: 'getting',
}
