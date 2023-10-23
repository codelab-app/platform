import type { ScriptProps } from 'next/script'
import Script from 'next/script'
import React from 'react'

export const CodelabScript = (props: ScriptProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Script {...props} strategy="afterInteractive" />
)

CodelabScript.displayName = 'CodelabScript'
