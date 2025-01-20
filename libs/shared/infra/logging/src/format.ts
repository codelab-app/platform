import type { ObjectLike } from '@codelab/shared/abstract/types'

import { prettifyForConsole } from '@codelab/shared/utils'
import colorizer from '@pinojs/json-colorizer'

export const formatNestLikeDate = (timestamp: unknown) => {
  if (typeof timestamp !== 'number') {
    throw new Error('Timestamp needs to be type number')
  }

  const date = new Date(timestamp)

  const formattedDate = date.toLocaleString('en-US', {
    day: '2-digit',
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    month: '2-digit',
    second: '2-digit',
    year: 'numeric',
  })

  return formattedDate
}

export const colorize = (object: ObjectLike): string => {
  // Assuming message is a JSON object. If it's a string, you may not need JSON.stringify
  // Adjust this based on the actual data structure of your messages
  const messageString =
    typeof object === 'object' ? prettifyForConsole(object) : object

  return colorizer(messageString, {
    colors: {
      BOOLEAN_LITERAL: 'white',
      BRACE: 'white',
      BRACKET: 'white',
      COLON: 'white',
      COMMA: 'white',
      NULL_LITERAL: 'white',
      NUMBER_LITERAL: 'white',
      STRING_KEY: 'white',
      STRING_LITERAL: 'green',
    },
  })
}
