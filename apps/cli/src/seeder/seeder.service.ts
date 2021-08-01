import { Injectable } from '@nestjs/common'
import fs from 'fs'
import { Command, Console } from 'nestjs-console'

@Console()
@Injectable()
export class SeederService {
  private antDesignFolder = `${process.cwd()}/data/antd/`

  /**
   * Import Ant Design .csv props files to our system
   */
  @Command({
    command: 'seed',
  })
  importAntCsvData() {
    fs.readdirSync(this.antDesignFolder).forEach((file) => {
      // Print file name
      console.log(file)

      /*
    Run this to print the file contents
    console.log(readFileSync(".levels/" + file, {encoding: "utf8"}))
    */
    })

    // // but if your goal is just to print the file name you can do this
    // fs.readFileSync('.levels/').forEach(console.log)
  }
}
