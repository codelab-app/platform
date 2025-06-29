import type { SubmitController } from '@codelab/frontend-abstract-types'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { MutableRefObject } from 'react'

import Button from 'antd/lib/button/button'

export interface SubmitRefProps {
  submitRef: MutableRefObject<Maybe<SubmitController>>
}

export const SubmitRefButton = ({ submitRef }: SubmitRefProps) => {
  return <Button onClick={() => submitRef.current?.submit()}>Save</Button>
}
