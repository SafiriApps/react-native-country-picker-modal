const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Redirect imports from the package to src/ for live development
const srcPath = path.resolve(workspaceRoot, 'src')
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native-country-picker-modal') {
    return {
      filePath: path.resolve(srcPath, 'index.tsx'),
      type: 'sourceFile',
    }
  }
  // Fall back to default resolution
  return context.resolveRequest(context, moduleName, platform)
}

config.resolver.extraNodeModules = {
  react: path.resolve(workspaceRoot, 'node_modules/react'),
  'react-native': path.resolve(workspaceRoot, 'node_modules/react-native'),
}
config.resolver.disableHierarchicalLookup = true

module.exports = config
