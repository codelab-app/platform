import { Result } from './Result'

export interface WithChanges {
  changes: Changes
}

export class Changes {
  private changes: Array<Result<any>>

  constructor() {
    this.changes = []
  }

  public addChange(result: Result<any>): void {
    this.changes.push(result)
  }

  public getChangeResult(): Result<any> {
    return Result.combine(this.changes)
  }
}
