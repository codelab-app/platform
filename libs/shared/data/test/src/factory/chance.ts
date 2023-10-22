import Chance from 'chance'
import isNil from 'lodash/isNil'

let chanceInstance: Chance.Chance | undefined

if (isNil(chanceInstance)) {
  chanceInstance = new Chance()
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default chanceInstance!
