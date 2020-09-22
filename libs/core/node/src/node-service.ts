import { IsValidCreateDtoModel } from './node-specification'
import { Validator } from './validator'
import { NodeDtoI } from '@codelab/shared/interface/node'
/**
 * Responsible for making API call to database to fetch records. The domain object interacts with services
 */
export class NodeService {
  validator

  constructor() {
    this.validator = new Validator()
  }

  /**
   * Allows user to create a Mongoose model
   */
  createModel(data: NodeDtoI) {
    this.validator.addRule(new IsValidCreateDtoModel()).validate(data)

    // const modelValidation = new Node()
  }

  // updateModel() {}

  // editModel() {}
}
