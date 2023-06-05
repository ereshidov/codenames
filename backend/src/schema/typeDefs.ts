import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

export const loadedFiles = loadFilesSync('src/**/*.graphql')
export const typeDefs = mergeTypeDefs(loadedFiles)
