import { preferenceRepository } from '@codelab/frontend-domain-preference/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import type { Side } from '../../sections/content/builder-resize-controller'
import { builderResizeController } from '../../sections/content/builder-resize-controller'

const useResizer = ({ side }: { side: Side }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { preferenceDomainService } = useDomainStore()
  const preference = preferenceDomainService.preference
  const breakpoint = preference.builderBreakpoint

  // debounce api calls
  useDebounce(
    () => {
      // only when drag is stopped update call api
      void preferenceRepository.update(preference)
    },
    2000,
    [preference.builderWidth],
  )

  useEffect(() => {
    if (ref.current === null) {
      return
    }

    const disposeResizeController = builderResizeController(ref.current, {
      getDefaultValue: () => preference.builderWidth,

      getMaxValue: () => breakpoint.max,

      getMinValue: () => breakpoint.min,

      getSide: () => side,

      onValueChanged: (builderWidth) => {
        // we want direct state update without debounce
        preference.writeCache({ builderWidth })
      },
    })

    return () => {
      disposeResizeController()
    }
  }, [side, breakpoint])

  return ref
}

export const BuilderResizeHandle = observer<PropsWithChildren>(
  ({ children }) => {
    const beforeElementRef = useResizer({ side: 'before' })
    const afterElementRef = useResizer({ side: 'after' })
    const [hovered, setHovered] = React.useState(false)

    const getClassNames = () => {
      const defaultClassNames = 'h-full w-[3px] bg-gray-200'

      if (hovered) {
        return `${defaultClassNames} bg-blue-400 cursor-col-resize`
      }

      return defaultClassNames
    }

    return (
      <>
        <div
          className={getClassNames()}
          onMouseLeave={() => {
            setHovered(false)
          }}
          onMouseOver={() => {
            setHovered(true)
          }}
          ref={beforeElementRef}
        />
        {children}
        <div
          className={`${getClassNames()} relative`}
          onMouseLeave={() => {
            setHovered(false)
          }}
          onMouseOver={() => {
            setHovered(true)
          }}
          ref={afterElementRef}
        >
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 bg-inherit">
            <div className="flex space-x-0.5 rounded-r bg-inherit p-1.5 pl-1">
              <div className="h-6 w-0.5 bg-black"></div>
              <div className="h-6 w-0.5 bg-black"></div>
            </div>
          </div>
        </div>
      </>
    )
  },
)
