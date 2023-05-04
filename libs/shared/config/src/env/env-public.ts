/*
 * This is for the vars that are exposed to the browser
 */
interface EnvPublic {
  googleAnalytics: {
    id: string
  }
  hotjar: {
    id: number
    version: number
  }
  intercom: {
    app_id: string
  }
  supabase: {
    key: string
    url: string
  }
  vercel: {
    vercel_project_id: string
    vercel_team_id: string
  }
}

export const EnvPublic = (): EnvPublic => ({
  googleAnalytics: {
    id: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS'] || '',
  },
  hotjar: {
    id: parseInt(process.env['NEXT_PUBLIC_HOTJAR_ID'] || '0', 10),
    version: parseInt(process.env['NEXT_PUBLIC_HOTJAR_VERSION'] || '0', 10),
  },
  intercom: {
    // not using env.get because next.js doesn't align dynamic lookups
    app_id: process.env['NEXT_PUBLIC_INTERCOM_APP_ID'] || '',
  },
  supabase: {
    key: process.env['NEXT_PUBLIC_SUPABASE_KEY'] || '',
    url: process.env['NEXT_PUBLIC_SUPABASE_URL'] || '',
  },
  vercel: {
    vercel_project_id: process.env['NEXT_PUBLIC_VERCEL_PROJECT_ID'] || '',
    vercel_team_id: process.env['NEXT_PUBLIC_VERCEL_TEAM_ID'] || '',
  },
})
