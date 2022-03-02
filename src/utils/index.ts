import type {WebpackAsset} from '../types'

const webpackStatsJson = async (
  pathToStatsJson: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const {default: jsonData} = await import(pathToStatsJson)
  return JSON.parse(JSON.stringify(jsonData))
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
  const rowStrs = dataRows.map(({label, statSize, parsedSize, gzipSize}) => {
    return `| \`${label}\` | ${formatBytes(statSize)} | ${formatBytes(
      parsedSize
    )} | ${formatBytes(gzipSize)} |`
  })

  return `
| Name | StatsSize | ParsedSize | GzipSize | 
| ------ | ------ |  ------ |  ------ |
  ${rowStrs.join('\n')}`
}

export {webpackStatsJson, formatBytes, constructMDTable}
