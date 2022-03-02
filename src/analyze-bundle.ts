import * as core from '@actions/core'
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'
import webpack from 'webpack'

export const analyzeBundle = async (
  configPath: string,
  reportFilename: string
): Promise<void> => {
  const webpackConfigPath = `${process.env.GITHUB_WORKSPACE}/${configPath}`

  core.info(`> Reading the webpack config file from ${webpackConfigPath}`)
  const {default: webpackConfigProd} = await import(webpackConfigPath)

  if (!webpackConfigProd.plugins) {
    webpackConfigProd['plugins'] = []
  }

  webpackConfigProd.plugins.push(
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      reportFilename: `${process.env.GITHUB_WORKSPACE}/${reportFilename}`
    })
  )

  const compiler = webpack(webpackConfigProd)

  await webpackBuild(compiler)
}

const webpackBuild = async (compiler: webpack.Compiler): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats?.hasErrors()) {
        reject(err)
      }
      compiler.close(closeErr => {
        reject(closeErr)
      })
    })

    compiler.hooks.done.tap('ID', () => {
      resolve('compile finished')
    })
  })
}
