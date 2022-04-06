/**
 * https://frontend-devops.com/blog/pipe-serverside-props-in-nextjs
 */

type PipedGetServerSideProps = (arg?: any) => Promise<any> | any

export const ssrPipe =
  (...functions: Array<PipedGetServerSideProps>) =>
  async (
    input: any,
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
