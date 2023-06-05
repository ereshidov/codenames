import path from 'path'
// Installed 9.2.1 version because in last version (10+) got some strange errors
import glob from 'glob'
import { merge } from 'lodash'

const importAll = async (pattern: string): Promise<any[]> => {
  const globs = await Promise.all(
    glob
      .globSync(pattern, {
        cwd: __dirname,
        absolute: true
      })
      .map(async (p) => await import(p))
  )

  return merge({}, ...globs)
}

const resolversPath = path.resolve(__dirname, '..', 'modules')

export const generateResolvers = async (): Promise<any> => ({
  resolvers: {
    Query: await importAll(`${resolversPath}/**/queries/index.{ts,js}`)
  }
})
