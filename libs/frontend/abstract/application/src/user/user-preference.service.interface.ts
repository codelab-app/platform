export interface IUserPreferenceService {
  preferences: IUserPreference

  setElementTreeExpandedKeys(
    containerId: string,
    expandedKeys: Array<string>,
  ): void
}

export interface IUserPreference {
  explorerExpandedNodes: {
    [id: string]: Array<string>
  }
}
