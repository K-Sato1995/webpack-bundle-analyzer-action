/* eslint-disable sort-imports */
import * as core from '@actions/core'
import * as github from '@actions/github'
import {ACTION_PATH, DOWNLOAD_COMMENT, OUTPUT_FILE_PATH} from './consts'
import {analyzeBundle} from './analyze-bundle'
import {createOrUpdateComment} from './create-or-update-comment'
import {uploadReport} from './upload-artifact'
import {constructMDTable, webpackStatsJson} from './utils'

async function run(): Promise<void> {
  try {
    const configPath: string = core.getInput('webpack-config-path', {
      required: true
    })
    const githubToken: string = core.getInput('github-token', {
      required: true
    })
    const octokit = github.getOctokit(githubToken)
    const prNumber = github.context.payload.pull_request?.number

    await analyzeBundle(configPath, OUTPUT_FILE_PATH)
    await uploadReport(OUTPUT_FILE_PATH)

    if (prNumber) {
      const pathToStats = `${process.env.GITHUB_WORKSPACE}/${OUTPUT_FILE_PATH}.json`
      const webpackStatsData = await webpackStatsJson(pathToStats)
      const mdTable = constructMDTable(webpackStatsData)
      const markdownComment = `
## Overview
${mdTable}
## Check the Report
[${DOWNLOAD_COMMENT}](${ACTION_PATH})
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
