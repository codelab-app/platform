import { flow } from 'lodash'
import { addAntdAtomIcons } from './add-antd-atoms-icons'
import { addAntdTags } from './add-antd-tags'

export const antdAtomsFactory = flow(addAntdTags, addAntdAtomIcons)
