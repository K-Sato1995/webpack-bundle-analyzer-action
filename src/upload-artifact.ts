import * as artifact from '@actions/artifact'
import * as core from '@actions/core'
import {ARTIFACT_NAME} from './consts'

export const uploadReport = async (
  reportFilename: string
): Promise<artifact.UploadResponse> => {
  const artifactClient = artifact.create()
  const filePath = `${process.env.GITHUB_WORKSPACE}/${reportFilename}.html`

  core.info(`> Uploading ${filePath}`)

  const response = await artifactClient.uploadArtifact(
    ARTIFACT_NAME,
    [filePath],
    `${process.env.GITHUB_WORKSPACE}`
  )

  core.info(`> Finished Uploading ${response}`)

  return response
}
