import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'la5zc8cr',
    dataset: 'production'
  },
  deployment: {
    appId: 'jdxa0f3otu6i0lvoq31vdbne',
    autoUpdates: true,
  },
})
