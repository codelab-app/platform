import React from 'react'

declare module 'react' {
  interface Attributes {
    // Default type is any, this allows better type safety so we can't pass an object here
    'data-cy'?: string
  }
}
