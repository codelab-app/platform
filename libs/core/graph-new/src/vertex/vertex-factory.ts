import { VertexA, VertexI } from '@codelab/shared/interface/graph'

export class VertexFactory {
  /**
   *
   * @param data could either come from a create form, or fetched from database
   */
  // constructor() {}

  static fromForm(data: VertexI) {}

  static fromRepo(data: VertexA) {}
}
