import Page from './page'

/**
 * This default is needed when we access `/builder/*`, since without having navigated there, we don't know the state here
 *
 * From my understanding, since if we hard refresh to this url, one level up we haven't loaded any pages yet
 */
export default Page
