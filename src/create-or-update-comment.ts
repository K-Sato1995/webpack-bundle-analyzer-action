import {DOWNLOAD_COMMENT} from './consts'
import core from '@actions/core'
import type {getOctokit} from '@actions/github'
import github from '@actions/github'

type Octokit = ReturnType<typeof getOctokit>

export const createOrUpdateComment = async (
  octokit: Octokit,
  prNumber: number,
  commentBody: string
): Promise<void> => {
  const context = github.context
  const comments = await octokit.rest.issues.listComments({
    ...context.repo,
    issue_number: prNumber
  })

  const existingComment = comments.data.find(
    comment => comment.body && comment.body.includes(DOWNLOAD_COMMENT)
  )

  if (existingComment) {
    core.info(`> Updating comment ${existingComment.id}`)
    const response = await octokit.rest.issues.updateComment({
      ...github.context.repo,
      comment_id: existingComment.id,
      body: commentBody
    })
    core.info(
      `> Finished updating ${existingComment.id} with status ${response.status}`
    )
  } else {
    core.info(`> Creating a new comment on PR: ${prNumber}`)
    const response = await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: prNumber,
      body: commentBody
    })
    core.info(
      `> Finished creating a comment on PR: ${prNumber} with status ${response.status}`
    )
  }
}
