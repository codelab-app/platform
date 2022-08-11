import React from 'react'
import tw from 'twin.macro'

export const CurveAccent = () => (
  <div css={tw`relative`}>
    {/* Generated from https://getwaves.io/ */}
    <svg
      // css={tw`fill-yellow-500`}
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,64L80,96C160,128,320,192,480,218.7C640,245,800,235,960,202.7C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        // <svg /> fill-yellow-500 has issues
        // fill="#eab308"
        fill="#facc15"
        fillOpacity="1"
      ></path>
    </svg>
  </div>
)
