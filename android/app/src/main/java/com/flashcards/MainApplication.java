package com.flashcards;

import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    private CodePush codePushInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        codePushInstance =
                new CodePush(getResources().getString(
                        R.string.reactNativeCodePush_androidDeploymentKey),
                        MainApplication.this, BuildConfig.DEBUG);
    }

    @Override
    public String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

    @Override
    public String getJSMainModuleName() {
        return "index.bundle";
    }

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new VectorIconsPackage(),
                new LottiePackage(),
                new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)),
                new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)),
                new AppCenterReactNativePackage(MainApplication.this),
                codePushInstance
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

}
