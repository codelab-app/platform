import {
  AntdDesignField,
  AntDesignFieldsByFile,
} from '@codelab/backend/abstract/core'
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'

export const readCsvFiles = async (
  folder: string,
): Promise<AntDesignFieldsByFile> => {
  const csvFiles = fs.readdirSync(folder)

  return csvFiles.reduce(async (data, file: string) => {
    const fields: Array<AntdDesignField> = []

    const stream = fs
      .createReadStream(path.resolve(folder, file))
      .pipe(csv())
      .on('data', (chunk) =>
        fields.push({
          ...chunk,
          // Convert string to boolean
          isEnum: JSON.parse(`${chunk.isEnum}`),
        }),
      )

    // https://stackoverflow.com/questions/37837132/how-to-wait-for-a-stream-to-finish-piping-nodejs
    // Wait for the stream
    await new Promise((fulfill) => stream.on('finish', fulfill))

    // return Promise.resolve(data.set(file, fields))
    // Run this to print the file contents
    // console.log(readFileSync(".levels/" + file, {encoding: "utf8"}))
    // try {
    //   const parser = new Parser({ fields: antdTableKeys })
    //   const csv = parser.parse(fileContents)
    //   console.log(csv)
    // } catch (err) {
    //   console.error(err)
    // }
    return Promise.resolve({
      ...(await data),
      [file]: fields,
    })
  }, Promise.resolve<AntDesignFieldsByFile>({}))

  // but if your goal is just to print the file name you can do this
  // fs.readFileSync('.levels/').forEach(console.log)
}
