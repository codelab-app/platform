export interface APIConfiguration {
  port: number
}

export default () => ({
  port: process.env.API_PORT,
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  // },
})
