/* eslint-disable @typescript-eslint/no-require-imports */
'use client'

/**
 * If we don't use function, only `require` works.
 */
export const initWdyr = () => {
  // Only load why-did-you-render in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Loading wdyr')

    // We must use require here, because Next.js processes imports differently
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const whyDidYouRender = require('@welldone-software/why-did-you-render')

    // Also require React for the patch
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const React = require('react')

    whyDidYouRender(React, {
      exclude: [/^PopupContent/],
      /**
       * https://github.com/welldone-software/why-did-you-render?tab=readme-ov-file#logondifferentvalues
       */
      logOnDifferentValues: true,
      trackAllPureComponents: false,
      /**
       * Causes `Warning: React has detected a change in the order of Hooks called by Router. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks`
       */
      trackHooks: false,
    })
  }
}
