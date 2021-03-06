![](https://github.com/marcmo/flashcards/blob/master/flashcards.gif)

## Prepare Project Setup

    yarn install

## Run ios simulator

    node ./node_modules/react-native/local-cli/cli.js run-ios

or using ruby rake

    rake ios:run

## Run android simulator

First make sure you have an emulator running or an android phone in debug mode attached

    node ./node_modules/react-native/local-cli/cli.js run-android

or using ruby rake

    rake android:run


## Install development environment

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

### Add react-native-navigation

don't forget to add

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

to MainApplication.java

### Enable release builds android

App has to be [signed before](https://facebook.github.io/react-native/docs/signed-apk-android.html)

### setup redux

### codepush

error: Update is invalid - A JS bundle file named "null" could not be found within the downloaded contents.
Please check that you are releasing your CodePush updates using the exact same JS bundle file name that
was shipped with your app's binary.

* make sure to override these functions:

    @Override
    public String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

    @Override
    public String getJSMainModuleName() {
        return "index.bundle";
    }

* add redux and redux-persist

## Gotchas

### gradle properties

do NOT name your gradle-properties in a general way (e.g. "MYAPP_XYZ") but rather specific
(e.g. "FLASHCARDS_XYZ"). gradle *will* pull in your global properties!! might clash!

### Gradle build release fails

    > Task :app:processReleaseResources
    Failed to execute aapt

gradle 4.1 problem, add this to gradle.properties

    android.enableAapt2=false

