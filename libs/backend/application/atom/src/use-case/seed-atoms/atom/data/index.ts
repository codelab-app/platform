import { antdAtomData } from './antd-atom.data'
import { htmlAtomData } from './html-atom.data'
import { reactAtomData } from './react-atom.data'

// Colocate here
export const atomsData = { ...htmlAtomData, ...antdAtomData, ...reactAtomData }

export { antdAtomData, htmlAtomData, reactAtomData }
