import { pipe } from 'ramda'
import { appendAntdAtomTags } from './append-antd-atom-tags'
import { appendAntdAtomIcons } from './append-antd-atoms-icons'

export const antdAtomsFactory = pipe(appendAntdAtomTags, appendAntdAtomIcons)
