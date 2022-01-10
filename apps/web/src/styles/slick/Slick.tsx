import { css } from '@emotion/react'

export const slickCssFix = css`
  .slick-prev:before,
  .slick-next:before {
    color: black !important;
  }
  .slick-slider {
    padding-left: 15px;
    padding-right: 15px;
  }
  .slick-dots {
    left: 0;
    bottom: -50px !important;
  }
`
