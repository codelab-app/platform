import { CommandModule } from 'yargs'

export const demoCommand: CommandModule<any, any> = {
  command: 'demo',
  describe: 'Demo ',
  handler: async () => {
    console.log('Demo')
  },
}
