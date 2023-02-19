import { css } from '@emotion/react'

/**
 * Discovered first when using Ant Design Image component, the preview feature was off-centered
 */
const displayInlineReset = css`
  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: inline;
  }
`

export const globalTailwindFix = [displayInlineReset]
