/**
 * https://frontend-devops.com/blog/pipe-serverside-props-in-nextjs
 */

import type { ObjectLike } from '@codelab/shared/abstract/types'

type PipedGetServerSideProps = (arg?: unknown) => unknown | Promise<unknown>

export const ssrPipe =
  (...functions: Array<PipedGetServerSideProps>) =>
  async (
    input: unknown,
  ): Promise<{
    props: ObjectLike
  }> => {
    const parsedObject = JSON.parse(JSON.stringify(input))

    return {
      props: await functions.reduce(
        (chain, func) => chain.then(func),
        Promise.resolve(parsedObject),
      ),
    }
  }
