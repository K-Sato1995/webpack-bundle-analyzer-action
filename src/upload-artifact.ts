import {ARTIFACT_NAME} from './consts'
import artifact from '@actions/artifact'
import core from '@actions/core'

export const uploadReport = async (
  reportFilename: string
): Promise<artifact.UploadResponse> => {
  const artifactClient = artifact.create()
  const filePath = `${process.env.GITHUB_WORKSPACE}/${reportFilename}`

  core.info(`> Uploading ${filePath}`)

  const response = await artifactClient.uploadArtifact(
    ARTIFACT_NAME,
    [filePath],
    `${process.env.GITHUB_WORKSPACE}`
  )

  core.info(`> Finished Uploading ${response}`)

  return response
}
