import type { Rect } from '@codelab/frontend-shared-utils'

import {
  type ISpacingValues,
  Margins,
  Paddings,
} from '@codelab/frontend-presentation-view/components/overlay'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

export const ElementOverlay = observer<{
  rect: Rect
  domElement: HTMLElement
}>(({ domElement, rect }) => {
  const [margins, setMargins] = useState<ISpacingValues | null>(null)
  const [paddings, setPaddings] = useState<ISpacingValues | null>(null)

  useEffect(() => {
    const {
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
    } = window.getComputedStyle(domElement)

    setMargins({
      $bottom: marginBottom,
      $left: marginLeft,
      $right: marginRight,
      $top: marginTop,
    })

    setPaddings({
      $bottom: paddingBottom,
      $left: paddingLeft,
      $right: paddingRight,
      $top: paddingTop,
    })
  }, [rect, domElement])

  if (!margins || !paddings) {
    return null
  }

  return (
    <>
      <Margins values={margins} />
      <Paddings values={paddings} />
    </>
  )
})
