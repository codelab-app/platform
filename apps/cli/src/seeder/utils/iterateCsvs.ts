import { AntdDesignApi } from '@codelab/backend'
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'

export const iterateCsvs = async (
  folder: string,
  iterator: (data: Array<AntdDesignApi>, file: string) => Promise<void> | void,
) => {
  const csvFiles = fs.readdirSync(folder)
  const promises: Array<Promise<void>> = []

  csvFiles.forEach((file) => {
    const results: Array<AntdDesignApi> = []

    fs.createReadStream(path.resolve(folder, file))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const res = iterator(
          results.map((api) => ({
            ...api,
            isEnum: JSON.parse(api.isEnum as any),
          })),
          file,
        )

        if (res) {
          promises.push(res)
        }
      })

    /*
    Run this to print the file contents
    console.log(readFileSync(".levels/" + file, {encoding: "utf8"}))
  */

    // try {
    //   const parser = new Parser({ fields: antdTableKeys })
    //   const csv = parser.parse(fileContents)
    //   console.log(csv)
    // } catch (err) {
    //   console.error(err)
    // }
  })

  await Promise.all(promises)

  // // but if your goal is just to print the file name you can do this
  // fs.readFileSync('.levels/').forEach(console.log)
}
