/// <reference types="@welldone-software/why-did-you-render" />

import React from 'react'

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const whyDidYouRender = require('@welldone-software/why-did-you-render')

    whyDidYouRender(React, {
      // include: [/.*/],
      /**
       * Ant Design Tabs component causes multiple re-renders to show up as OperationNode.
       */
      exclude: [/OperationNode/],
      trackAllPureComponents: true,
      // logOwnerReasons: true,
      collapseGroups: true,
      // trackHooks: true,
    })
  }
}
