/* eslint-disable sort-imports */
import * as core from '@actions/core'
import {DOWNLOAD_COMMENT} from './consts'
import {analyzeBundle} from './analyze-bundle'
import {createOrUpdateComment} from './create-or-update-comment'
import github from '@actions/github'
import {uploadReport} from './upload-artifact'
import {constructMDTable, isJS, webpackStatsJson} from './utils'

async function run(): Promise<void> {
  try {
    const configPath: string = core.getInput('webpack-config-path', {
      required: true
    })
    const githubToken: string = core.getInput('github-token', {
      required: true
    })
    const reportFilename: string = core.getInput('report-file-name')
    const octokit = github.getOctokit(githubToken)
    const prNumber = github.context.payload.pull_request?.number

    await analyzeBundle(configPath, reportFilename)
    await uploadReport(reportFilename)

    if (prNumber) {
      core.info(`> Pull Request Number ${prNumber}`)
      const webpackStatsData = await webpackStatsJson('')
      const jsFiles = webpackStatsData.assets.filter((asset: {name: string}) =>
        isJS(asset.name)
      )
      const mdTable = constructMDTable(jsFiles)
      const markdownComment = `
      ## Overview
      ${mdTable}
      ## Check the detail
      ${DOWNLOAD_COMMENT}
      `
      await createOrUpdateComment(octokit, prNumber, markdownComment)
    } else {
      core.info('> No pull request found.')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
