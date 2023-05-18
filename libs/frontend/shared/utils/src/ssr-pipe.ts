/**
 * https://frontend-devops.com/blog/pipe-serverside-props-in-nextjs
 */

type PipedGetServerSideProps = (arg?: unknown) => Promise<unknown> | unknown

export const ssrPipe =
  (...functions: Array<PipedGetServerSideProps>) =>
  async (
    input: unknown,
  ): Promise<{
    props: Record<string, unknown>
  }> => {
    const parsedObject = JSON.parse(JSON.stringify(input))

    return {
      props: await functions.reduce(
        (chain, func) => chain.then(func),
        Promise.resolve(parsedObject),
      ),
    }
  }
