import * as mongoose from 'mongoose'
import { NodeI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export const buildModel = <P extends Props = {}>(
  data: NodeI,
): mongoose.Model<any> => {
  // const root = makeTree(data)
  //
  // traversePostOrder(root, )

  return null
}
