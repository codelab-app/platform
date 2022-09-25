import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'
import { AntdDesignApi } from './data/ant-design.data'

export const iterateCsvs = async (
  folder: string,
  iterator: (data: Array<AntdDesignApi>, file: string) => Promise<void> | void,
) => {
  const csvFiles = fs.readdirSync(folder)
  const promises: Array<Promise<void>> = []

  await Promise.all(
    csvFiles.map(async (file) => {
      const results: Array<AntdDesignApi> = []

      const stream = fs
        .createReadStream(path.resolve(folder, file))
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

      // https://stackoverflow.com/questions/37837132/how-to-wait-for-a-stream-to-finish-piping-nodejs
      // Wait for the stream
      return new Promise((fulfill) => stream.on('finish', fulfill))

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
    }),
  )

  await Promise.all(promises)

  // // but if your goal is just to print the file name you can do this
  // fs.readFileSync('.levels/').forEach(console.log)
}
