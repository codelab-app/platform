import { LoggerService } from '@nestjs/common'
import { Command, CommandRunner, Option } from 'nest-commander'
import { CodelabLogger } from './logger/logger.service'

interface BasicCommandOptions {
  boolean?: boolean
  number?: number
  string?: string
}

@Command({ description: 'A parameter parse', name: 'basic' })
export class BasicCommand extends CommandRunner {
  constructor(private readonly logService: CodelabLogger) {
    super()
  }

  async run(
    passedParam: Array<string>,
    options?: BasicCommandOptions,
  ): Promise<void> {
    if (options?.boolean !== undefined) {
      this.runWithBoolean(passedParam, options.boolean)
    } else if (options?.number) {
      this.runWithNumber(passedParam, options.number)
    } else if (options?.string) {
      this.runWithString(passedParam, options.string)
    } else {
      this.runWithNone(passedParam)
    }
  }

  @Option({
    description: 'A basic number parser',
    flags: '-n, --number [number]',
  })
  parseNumber(val: string): number {
    return Number(val)
  }

  @Option({
    description: 'A string return',
    flags: '-s, --string [string]',
  })
  parseString(val: string): string {
    return val
  }

  @Option({
    description: 'A boolean parser',
    flags: '-b, --boolean [boolean]',
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val)
  }

  runWithString(param: Array<string>, option: string): void {
    this.logService.log({ param, string: option })
  }

  runWithNumber(param: Array<string>, option: number): void {
    this.logService.log({ number: option, param })
  }

  runWithBoolean(param: Array<string>, option: boolean): void {
    this.logService.log({ boolean: option, param })
  }

  runWithNone(param: Array<string>): void {
    this.logService.log({ param })
  }
}
