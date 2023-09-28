import React from 'react'
import { Display, FlexAlignItems, FlexJustifyItems, GridAlign } from '../css'

// TODO: revisit icon sizes
interface AlignIconProps {
  align: FlexAlignItems
  vertical?: boolean
}

interface JustifyIconProps {
  justify: FlexJustifyItems
  vertical?: boolean
}

export const FlexJustifyIcon = ({ justify, vertical }: JustifyIconProps) => {
  switch (justify) {
    case FlexJustifyItems.Start:
      return JustifyStartIcon(vertical)
    case FlexJustifyItems.Center:
      return JustifyCenterIcon(vertical)
    case FlexJustifyItems.End:
      return JustifyEndIcon(vertical)
    case FlexJustifyItems.SpaceBetween:
      return JustifySpaceBetweenIcon(vertical)
    case FlexJustifyItems.SpaceAround:
      return JustifySpaceAroundIcon(vertical)
    default:
      return null
  }
}

export const FlexAlignIcon = ({ align, vertical }: AlignIconProps) => {
  switch (align) {
    case FlexAlignItems.Start:
      return AlignStartIcon(vertical)
    case FlexAlignItems.Center:
      return AlignCenterIcon(vertical)
    case FlexAlignItems.End:
      return AlignEndIcon(vertical)
    case FlexAlignItems.Stretch:
      return AlignStretchIcon(vertical)
    case FlexAlignItems.Baseline:
      return AlignBaselineIcon(vertical)
    default:
      return null
  }
}

export const DistributeIcon = ({
  align,
  vertical,
}: {
  align: GridAlign
  vertical?: boolean
}) => {
  switch (align) {
    case GridAlign.Start:
      return DistributeStartIcon(vertical)
    case GridAlign.Center:
      return DistributeCenterIcon(vertical)
    case GridAlign.End:
      return DistributeEndIcon(vertical)
    case GridAlign.Stretch:
      return DistributeStretchIcon(vertical)
    case GridAlign.SpaceBetween:
      return DistributeSpaceBetweenIcon(vertical)
    case GridAlign.SpaceAround:
      return DistributeSpaceAroundIcon(vertical)
    default:
      return null
  }
}

export const DisplayIcon = ({ display }: { display: Display }) => {
  switch (display) {
    case Display.Block:
      return DisplayBlockIcon()
    case Display.Flex:
      return DisplayFlexIcon()
    case Display.Grid:
      return DisplayGridIcon()
    case Display.InlineBlock:
      return DisplayInlineBlockIcon()
    case Display.Inline:
      return DisplayInlineIcon()
    case Display.None:
      return DisplayNoneIcon()
    default:
      return null
  }
}

const DisplayBlockIcon = () => {
  return (
    <svg height="1em" viewBox="0 0 16 16" width="1em">
      <path
        d="M2 4h12v8H2V4zm10 2H4v4h8V6z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
      <path
        d="M2 1h12v1H2V1zm0 13h12v1H2v-1z"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".6"
      ></path>
    </svg>
  )
}

const DisplayFlexIcon = () => {
  return (
    <svg height="1em" viewBox="0 0 16 16" width="1em">
      <path
        d="M2 2h12v12H2V2zM1 1h14v14H1V1z"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".6"
      ></path>
      <path
        d="M7 4H4v8h3V4zm2 0h3v8H9V4z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

const DisplayGridIcon = () => {
  return (
    <svg focusable="false" height="1em" viewBox="0 0 16 16" width="1em">
      <path
        d="M1 1h14v14H1V1zm13 1H2v12h12V2z"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".6"
      ></path>
      <path
        clipRule="evenodd"
        d="M4 4h3v3H4V4zm5 0h3v3H9V4zM5 9H4v3h3V9H5zm4 0h3v3H9V9z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

const DisplayInlineBlockIcon = () => {
  return (
    <svg focusable="false" height="1em" viewBox="0 0 16 16" width="1em">
      <path
        d="M4 4h8v8H4V4zm6 2H6v4h4V6z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
      <path
        clipRule="evenodd"
        d="M1 2h1v12H1V2zm14 0h-1v12h1V2z"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".6"
      ></path>
    </svg>
  )
}

const DisplayInlineIcon = () => {
  return (
    <svg focusable="false" height="1em" viewBox="0 0 16 16" width="1em">
      <path
        d="M1 2h1v12H1V2zm14 0h-1v12h1V2z"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".6"
      ></path>
      <path
        clipRule="evenodd"
        d="M7.25 3L3.5 13h2l1-3h3l1 3h2L8.75 3h-1.5zm1.917 6L8 5.5 6.833 9h2.334z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

const DisplayNoneIcon = () => {
  return (
    <svg focusable="false" height="1em" viewBox="0 0 16 16" width="1em">
      <path
        d="M9.842 3.33A5.537 5.537 0 008 3C4.134 3 1 7.5 1 8c0 .23.666 1.311 1.763 2.409l2.242-2.242a3 3 0 013.162-3.162l1.675-1.676zm-2.009 7.665a3 3 0 003.162-3.162l2.242-2.242C14.334 6.69 15 7.77 15 8c0 .5-3.134 5-7 5a5.538 5.538 0 01-1.842-.33l1.675-1.675z"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".6"
      ></path>
      <path d="M2 14L14 2" stroke="currentColor" strokeWidth="1.5"></path>
    </svg>
  )
}

const AlignStartIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H24V1.5H0V0Z" fill="currentColor"></path>
      <path d="M10.5 3H4.5V15H10.5V3Z" fill="currentColor"></path>
      <path d="M18 3H12V12H18V3Z" fill="currentColor"></path>
    </svg>
  )
}

const AlignCenterIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 4.5H10.5V10.5H12V6H18V10.5H24V12H18V16.5H12V12H10.5V18H4.5V12H0V10.5H4.5V4.5Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

const AlignEndIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.5 9H4.5V21H10.5V9Z" fill="currentColor"></path>
      <path d="M18 12H12V21H18V12Z" fill="currentColor"></path>
      <path d="M0 24V22.5H24V24H0Z" fill="currentColor"></path>
    </svg>
  )
}

const AlignStretchIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 0H0V1.5H24V0Z" fill="currentColor"></path>
      <path d="M24 24V22.5H0V24H24Z" fill="currentColor"></path>
      <path d="M4.5 3H10.5V21H4.5V3Z" fill="currentColor"></path>
      <path d="M12 3H18V21H12V3Z" fill="currentColor"></path>
    </svg>
  )
}

const AlignBaselineIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M12 4.5H18V10.5H24V12H18V15H12V12H10.5V18H4.5V12H0V10.5H4.5V4.5H10.5V10.5H12V4.5ZM13.5 10.5H16.5V6H13.5V10.5ZM9 10.5V6H6V10.5H9Z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

const JustifyStartIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M1.5 0H0V24H1.5V0ZM3 6H9V18H3V6ZM10.5 6H16.5V18H10.5V6Z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

const JustifyCenterIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0H10.5V24H12V0Z" fill="currentColor"></path>
      <path d="M3 6H9V18H3V6Z" fill="currentColor"></path>
      <path d="M13.5 6H19.5V18H13.5V6Z" fill="currentColor"></path>
    </svg>
  )
}

const JustifyEndIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.5 0H24V24H22.5V0Z" fill="currentColor"></path>
      <path d="M13.5 6H7.5V18H13.5V6Z" fill="currentColor"></path>
      <path d="M21 6H15V18H21V6Z" fill="currentColor"></path>
    </svg>
  )
}

const JustifySpaceBetweenIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 0H22.5V24H24V0Z" fill="currentColor"></path>
      <path d="M1.5 0H0V24H1.5V0Z" fill="currentColor"></path>
      <path d="M3 6H9V18H3V6Z" fill="currentColor"></path>
      <path d="M15 6H21V18H15V6Z" fill="currentColor"></path>
    </svg>
  )
}

const JustifySpaceAroundIcon = (vertical?: boolean) => {
  return (
    <svg
      data-icon="column-height"
      fill="none"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 0H22.5V24H24V0Z" fill="currentColor"></path>
      <path d="M1.5 0H0V24H1.5V0Z" fill="currentColor"></path>
      <path d="M4.5 6H10.5V18H4.5V6Z" fill="currentColor"></path>
      <path d="M13.5 6H19.5V18H13.5V6Z" fill="currentColor"></path>
    </svg>
  )
}

const DistributeStartIcon = (vertical?: boolean) => {
  return (
    <svg
      fill="none"
      height="11"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H24V1.5H0V0Z" fill="currentColor"></path>
      <path d="M10.5 3H4.5V9H10.5V3Z" fill="currentColor"></path>
      <path d="M18 3H12V9H18V3Z" fill="currentColor"></path>
      <path d="M10.5 10.5H4.5V16.5H10.5V10.5Z" fill="currentColor"></path>
      <path d="M18 10.5H12V16.5H18V10.5Z" fill="currentColor"></path>
    </svg>
  )
}

const DistributeCenterIcon = (vertical?: boolean) => {
  return (
    <svg
      fill="none"
      height="11"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.5 3H4.5V9H10.5V3Z" fill="currentColor"></path>
      <path d="M18 3H12V9H18V3Z" fill="currentColor"></path>
      <path d="M10.5 13.5H4.5V19.5H10.5V13.5Z" fill="currentColor"></path>
      <path d="M18 13.5H12V19.5H18V13.5Z" fill="currentColor"></path>
      <path d="M0 10.5H24V12H0V10.5Z" fill="currentColor"></path>
    </svg>
  )
}

const DistributeEndIcon = (vertical?: boolean) => {
  return (
    <svg
      fill="none"
      height="11"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.5 7.5H10.5V13.5H4.5V7.5Z" fill="currentColor"></path>
      <path d="M12 7.5H18V13.5H12V7.5Z" fill="currentColor"></path>
      <path d="M4.5 15H10.5V21H4.5V15Z" fill="currentColor"></path>
      <path d="M12 15H18V21H12V15Z" fill="currentColor"></path>
      <path d="M24 24V22.5H0V24H24Z" fill="currentColor"></path>
    </svg>
  )
}

const DistributeStretchIcon = (vertical?: boolean) => {
  return (
    <svg
      fill="none"
      height="11"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1.5H24V3H0V1.5Z" fill="currentColor"></path>
      <path d="M0 24V22.5H24V24H0Z" fill="currentColor"></path>
      <path d="M10.5 4.5H4.5V12H10.5V4.5Z" fill="currentColor"></path>
      <path d="M18 4.5H12V12H18V4.5Z" fill="currentColor"></path>
      <path d="M10.5 13.5H4.5V21H10.5V13.5Z" fill="currentColor"></path>
      <path d="M18 13.5H12V21H18V13.5Z" fill="currentColor"></path>
    </svg>
  )
}

const DistributeSpaceBetweenIcon = (vertical?: boolean) => {
  return (
    <svg
      fill="none"
      height="11"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H24V1.5H0V0Z" fill="currentColor"></path>
      <path d="M0 24V22.5H24V24H0Z" fill="currentColor"></path>
      <path d="M10.5 3H4.5V9H10.5V3Z" fill="currentColor"></path>
      <path d="M18 3H12V9H18V3Z" fill="currentColor"></path>
      <path d="M10.5 15H4.5V21H10.5V15Z" fill="currentColor"></path>
      <path d="M18 15H12V21H18V15Z" fill="currentColor"></path>
    </svg>
  )
}

const DistributeSpaceAroundIcon = (vertical?: boolean) => {
  return (
    <svg
      fill="none"
      height="11"
      transform={vertical ? 'scale(1 -1) rotate(-90 0 0)' : undefined}
      viewBox="0 0 24 24"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H24V1.5H0V0Z" fill="currentColor"></path>
      <path d="M0 24V22.5H24V24H0Z" fill="currentColor"></path>
      <path d="M10.5 4.5H4.5V10.5H10.5V4.5Z" fill="currentColor"></path>
      <path d="M18 4.5H12V10.5H18V4.5Z" fill="currentColor"></path>
      <path d="M10.5 13.5H4.5V19.5H10.5V13.5Z" fill="currentColor"></path>
      <path d="M18 13.5H12V19.5H18V13.5Z" fill="currentColor"></path>
    </svg>
  )
}
