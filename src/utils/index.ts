// https://webpack.js.org/api/stats/#chunk-objects
// https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/61
import type {WebpackAsset} from '../types'

const webpackStatsJson = async (
  pathToStatsJson: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const {default: jsonData} = await import(pathToStatsJson)
  return JSON.parse(jsonData)
}

const isJS = (fileName: string): boolean => {
  return fileName.split('.').pop() === 'js'
}

const formatBytes = (bytes: number, decimals = 2): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  let i = 0

  for (i; bytes > 1024; i++) {
    bytes /= 1024
  }

  return `${parseFloat(bytes.toFixed(decimals))} ${units[i]}`
}

const constructMDTable = (dataRows: WebpackAsset[]): string => {
  const rowStrs = dataRows.map(({name, size}) => {
    return `| \`${name}\` | ${formatBytes(size)} |`
  })

  return `
  | Name | Bundle Size(Parsed)  |
  | ------ | ------ |
  ${rowStrs.join('\n')}`
}

export {webpackStatsJson, isJS, formatBytes, constructMDTable}
