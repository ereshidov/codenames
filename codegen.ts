import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'backend/src/**/*.graphql',
  documents: 'frontend/src/**/*.graphql',
  generates: {
    'backend/src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    },
    'frontend/src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations']
    }
  }
}

export default config
