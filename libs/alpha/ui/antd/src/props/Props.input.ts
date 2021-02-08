import { OneOf } from '@tsed/schema'
import { RGLItemPropsSchema } from '@codelab/generated'

@OneOf(RGLItemPropsSchema)
export class Props {}
