import { AntdDesignApi } from '@codelab/backend/infra'
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'

export const iterateCsvs = async (
  folder: string,
  iterator: (data: Array<AntdDesignApi>, file: string) => Promise<void> | void,
) => {
  const csvFiles = fs.readdirSync(folder)

  for (const file of csvFiles) {
    const results = await new Promise<Array<AntdDesignApi>>(
      (resolve, reject) => {
        const r: Array<AntdDesignApi> = []

        fs.createReadStream(path.resolve(folder, file))
          .pipe(csv())
          .on('data', (data) => r.push(data))
          .on('end', () => {
            resolve(r)
          })
          .on('error', reject)
      },
    )

    await iterator(
      results.map((api) => ({
        ...api,
        isEnum: JSON.parse(api.isEnum as any),
      })),
      file,
    )

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
  }

  // // but if your goal is just to print the file name you can do this
  // fs.readFileSync('.levels/').forEach(console.log)
}
