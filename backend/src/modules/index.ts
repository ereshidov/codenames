import glob from 'glob'
import { merge } from 'lodash'

const requireAll = (pattern: string): any =>
  merge(
    {},
    ...glob
      .sync(pattern, {
        cwd: __dirname,
        absolute: true
      })
      .map(require)
  )
const queries = requireAll('./**/queries/**/index.ts')
// const mutations = requireAll('./**/mutations/**/index.ts')
// const entities = requireAll('./**/entities/**/index.ts')

export default {
  Query: {
    ...queries
  }
  // Mutation: {
  //   ...mutations
  // },
  // ...entities
}
