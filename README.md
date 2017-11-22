## Install environment

### Add typescript support

    yarn add tslib tslint tslint-react typescript-formatter typescript -D
    yarn add @types/enzyme @types/react @types/react-native @types/react-redux @types/redux-form -D
    yarn add --dev react-native-typescript-transformer

### Add typescript transformer packager config

in rn-cli.config.js

    module.exports = {
      getTransformModulePath () {
        return require.resolve('react-native-typescript-transformer')
      },
      getSourceExts () {
        return ['ts', 'tsx']
      }
    }

### Add basic packages

    yarn add ramda react-redux redux redux-form
