type PipedGetServerSideProps = (arg?: any) => Promise<any> | any

export const ssrPipe = (...functions: Array<PipedGetServerSideProps>) => async (
  input: any,
): Promise<{
  props: Record<string, unknown>
}> => {
  return {
    props: await functions.reduce(
      (chain, func) => chain.then(func),
      Promise.resolve(input),
    ),
  }
}
