/*
 * This is for the vars that are exposed to the browser
 */
interface EnvPublic {
  intercom: {
    app_id: string
  }
  hotjar: {
    id: number
    version: number
  }
  googleAnalytics: {
    id: string
  }
}

export const EnvPublic = (): EnvPublic => ({
  intercom: {
    // not using env.get because next.js doesn't align dynamic lookups
    app_id: process.env['NEXT_PUBLIC_INTERCOM_APP_ID'] || '',
  },
  hotjar: {
    id: parseInt(process.env['NEXT_PUBLIC_HOTJAR_ID'] || '0', 10),
    version: parseInt(process.env['NEXT_PUBLIC_HOTJAR_VERSION'] || '0', 10),
  },
  googleAnalytics: {
    id: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS'] || '',
  },
})
