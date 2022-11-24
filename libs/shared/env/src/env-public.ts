/*
 * This is for the vars that are exposed to the browser
 */
interface EnvPublic {
  intercom: {
    app_id: string
  }
}
export const EnvPublic = (): EnvPublic => ({
  intercom: {
    // not using env.get because next.js doesn't align dynamic lookups
    app_id: process.env['NEXT_PUBLIC_INTERCOM_APP_ID'] || '',
  },
})
