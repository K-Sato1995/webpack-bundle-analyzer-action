import * as core from '@actions/core'
import {analyze} from './analyze'

async function run(): Promise<void> {
  try {
    const configPath: string = core.getInput('webpack-config-path', {
      required: true
    })
    const reportFilename: string = core.getInput('report-file-name')

    await analyze(configPath, reportFilename)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
