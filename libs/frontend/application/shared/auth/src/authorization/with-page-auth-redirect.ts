import auth0Instance from '@codelab/shared/infra/auth0'

export const withPageAuthRedirect = () =>
  auth0Instance.withPageAuthRequired({
    // This function will run if the user is authenticated.
    getServerSideProps: async (ctx) => {
      return {
        props: {},
      }
    },
  })
