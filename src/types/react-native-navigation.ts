declare module 'react-native-navigation' {
  export interface NavigatorStyle {
    navBarTextColor?: string;
    navBarBackgroundColor?: string;
    navBarButtonColor?: string;
    navBarHidden?: boolean;
    navBarHideOnScroll?: boolean;
    navBarTranslucent?: boolean;
    navBarTitleTextCentered?: boolean; // android only
    navBarNoBorder?: boolean;
    drawUnderNavBar?: boolean;
    drawUnderTabBar?: boolean;
    statusBarBlur?: boolean;
    navBarBlur?: boolean;
    tabBarHidden?: boolean;
    statusBarHideWithNavBar?: boolean;
    statusBarHidden?: boolean;
    statusBarTextColorScheme?: string;
  }

  export class ScreenVisibilityListener {
    constructor(message: any);
    register();
  }
  export interface NavigatorButtons {
    leftButtons?: NavigatorButton[];
    rightButtons?: NavigatorButton[];
  }

  export interface NavigatorButton {
    id: string;
    icon?: any;
    title?: string;
    testID?: string;
    disabled?: boolean;
  }
  export interface DrawerStyle {
    // ( iOS only )
    drawerShadow?: boolean; // optional, add this if you want a side menu drawer shadow
    contentOverlayColor?: string; // optional, add this if you want a overlay color when drawer is open
    leftDrawerWidth?: number; // optional, add this if you want a define left drawer width (50=percent)
    rightDrawerWidth?: number; // optional, add this if you want a define right drawer width (50=percent)
    shouldStretchDrawer?: boolean; // optional, iOS only with 'MMDrawer' type,
    // whether or not the panning gesture will “hard-stop” at the maximum width for a
    // given drawer side, default : true,
  }

  export interface Drawer {
    left?: {
      screen: string;
      passProps?: any;
    };
    right?: {
      screen: string;
      passProps?: any;
    };
    disableOpenGesture?: boolean;
    style?: DrawerStyle;
  }

  export interface TabBasedApp {
    tabs: TabScreen[];
    tabsStyle?: {
      tabBarButtonColor?: string; // change the color of the tab icons and text (also unselected)
      tabBarSelectedButtonColor?: string; // change the color of the selected tab icon and text (only selected)
      tabBarBackgroundColor?: string; // change the background color of the tab bar
      tabBarHidden?: boolean; // make the tab bar hidden
      tabBarTranslucent?: boolean; // change the translucent of the tab bar to false
      tabBarTextFontFamily?: string; // change the tab font family
      tabBarLabelColor?: string; // iOS only. change the color of tab text
      tabBarSelectedLabelColor?: string; // iOS only. change the color of the selected tab text
      tabBarHideShadow?: boolean; // iOS only. Remove default tab bar top shadow (hairline)
      initialTabIndex: number; // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
    };
    appStyle?: {
      orientation?: 'auto' | 'landscape' | 'portrait'; // Sets a specific orientation to the entire app.
                                                       // Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
      statusBarTextColorScheme?: 'dark' | 'light'; // text color of status bar, 'dark' / 'light' (remembered across pushes)
      tabBarButtonColor?: string; // change the color of the tab icons and text (also unselected)
      navBarTextColor: string; // change the text color of the title (remembered across pushes)
      tabBarSelectedButtonColor?: string; // change the color of the selected tab icon and text (only selected)
      navBarBackgroundColor: string; // change the background color of the nav bar (remembered across pushes)
      navigationBarColor?: string; // change the background color of the bottom native navigation bar.
      statusBarColor?: string; // change the color of the status bar.
      forceTitlesDisplay?: boolean; // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
      bottomTabBadgeTextColor?: string; // Optional, change badge text color. Android only
      bottomTabBadgeBackgroundColor?: string; // Optional, change badge background color. Android only
      initialTabIndex: number; // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
      backButtonImage?: any; // Change the back button default arrow image with provided image. iOS only
      hideBackButtonTitle?: boolean; // Hide back button title. Default is false.
      tabBarBackgroundColor?: string; // On Android, add BottomTabs styles to AppStyle, change the background color of the tab bar
      // If `backButtonTitle` provided so it will take into account and the `backButtonTitle` value will show. iOS only
      tabFontFamily: string;  // existing font family name or asset file without extension
      // which can be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
    };
    drawer?: Drawer;
    passProps?: object;
    animationType?: string;
  }

  export interface SingleScreenApp {
    screen: Screen;
    drawer?: Drawer;
    passProps?: object;
    animationType?: string;
  }

  export interface TabScreen {
    label?: string;
    screen: string;
    icon?: any;
    selectedIcon?: any;
    title?: string;
    navigatorStyle?: NavigatorStyle;
    navigatorButtons?: NavigatorButtons;
  }

  export interface Screen {
    screen: string;
    title?: string;
    navigatorStyle?: NavigatorStyle;
    navigatorButtons?: NavigatorButtons;
  }

  export interface ModalScreen extends Screen {
    passProps?: object;
    animated?: boolean;
    animationType?: 'fade' | 'slide-horizontal'; // 'fade' (for both) / 'slide-horizontal' (for android) does
    // the push have different transition animation (optional)
  }

  export interface PushedScreen extends ModalScreen {
    backButtonTitle?: string;
    backButtonHidden?: boolean;
    titleImage?: string; // iOS only. navigation bar title image instead of the
    // title text of the pushed screen (optional)
    passProps?: object; // Object that will be passed as props to the pushed screen (optional)
    animated?: boolean; // does the push have transition animation or does it happen immediately (optional)
  }

  export interface LightBox {
    screen: string;
    passProps?: object;
    style?: {
      backgroundBlur: string;
      backgroundColor?: string;
    };
  }

  export class Navigation {
    static registerComponent(screenID: string, generator: () => any, store?: any, provider?: any): any;

    static registerScreen(screenId: string, generator: () => any): any;

    static startTabBasedApp(params: TabBasedApp): any;

    static startSingleScreenApp(params: SingleScreenApp): any;

    static showModal(params: ModalScreen): any;

    static dismissModal(params?: { animationType?: string }): any;

    static dismissMeasurementFlow(params?: { animationType?: string }): any;

    static dismissAllModals(params?: { animationType?: string }): any;

    static showLightBox(params: LightBox): any;

    static dismissLightBox(): any;

    static lockToPortrait(): any;

    static lockToLandscape(): any;

    static lockToSensorLandscape(): any;

    static unlockAllOrientations(): any;

    static showMaterialDialog(options: any): any;
  }

  interface StyleOptions {
    // Common
    navBarTextColor: string; // change the text color of the title (remembered across pushes)
    navBarTextFontSize: number; // change the font size of the title
    navBarTextFontFamily: string; // Changes the title font
    navBarBackgroundColor: string; // change the background color of the nav bar (remembered across pushes)
    navBarCustomView: string; // registered component name
    navBarComponentAlignment: 'center' | 'fill'; // center/fill
    navBarCustomViewInitialProps: object; // Serializable JSON passed as props
    navBarButtonColor?: string; // Change color of nav bar buttons (eg. the back button) (remembered across pushes)

    navBarHidden?: boolean; // make the nav bar hidden
    navBarHideOnScroll?: boolean; // make the nav bar hidden only after the user starts to scroll
    navBarTranslucent?: boolean; // make the nav bar semi-translucent, works best with drawUnderNavBar:true
    navBarTransparent?: boolean; // make the nav bar transparent, works best with drawUnderNavBar:true,
    navBarNoBorder?: boolean; // hide the navigation bar bottom border (hair line). Default false
    drawUnderNavBar?: boolean; // draw the screen content under the nav bar, works best with navBarTranslucent:true
    drawUnderTabBar?: boolean; // draw the screen content under the tab bar (the tab bar is always translucent)
    navBarBlur?: boolean; // blur the entire nav bar, works best with drawUnderNavBar:true
    tabBarHidden?: boolean; // make the screen content hide the tab bar (remembered across pushes)
    statusBarHidden?: boolean; // make the status bar hidden regardless of nav bar state
    statusBarTextColorScheme?: 'dark' | 'light'; // text color of status bar, 'dark' / 'light' (remembered across pushes)
    navBarSubtitleColor?: string; // subtitle color
    navBarSubtitleFontFamily?: string; // subtitle font, 'sans-serif-thin' for example
    navBarSubtitleFontSize?: number; // subtitle font size
    screenBackgroundColor?: string; // Default screen color, visible before the actual react view is rendered
    orientation?: 'auto' | 'landscape' | 'portrait'; // Sets a specific orientation to a modal and all screens pushed to it
    disabledButtonColor?: string; // chnaged the navigation bar button text color when disabled.

    // iOS only
    statusBarTextColorSchemeSingleScreen?: 'dark' | 'light'; // same as statusBarTextColorScheme but does NOT remember across pushes
    statusBarHideWithNavBar?: boolean; // hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
    statusBarBlur?: boolean; // blur the area under the status bar, works best with navBarHidden:true

    disabledBackGesture?: boolean; // default: false. Disable the back gesture (swipe gesture) in order to pop the top screen.
    disabledSimultaneousGesture?: boolean; // default: true. Disable simultaneous gesture recognition.
    screenBackgroundImageName?: string; // Optional. default screen background image.
    rootBackgroundImageName?: string; // Static while you transition between screens. Works best with screenBackgroundColor: 'transparent'

    navBarButtonFontSize?: number; // Change font size nav bar buttons (eg. the back button) (remembered across pushes)
    navBarButtonFontWeight?: string; // Change font weight nav bar buttons (eg. the back button) (remembered across pushes)

    navBarLeftButtonFontSize?: number; // Change font size of left nav bar button
    navBarLeftButtonColor?: string; // Change color of left nav bar button
    navBarLeftButtonFontWeight?: string; // Change font weight of left nav bar button

    navBarRightButtonFontSize?: number; // Change font size of right nav bar button
    navBarRightButtonColor?: string; // Change color of right nav bar button
    navBarRightButtonFontWeight?: string; // Change font weight of right nav bar button

    // Android only
    navigationBarColor?: string; // change the background color of the bottom native navigation bar.
    navBarTitleTextCentered?: boolean; // default: false. centers the title.
    navBarButtonFontFamily?: string; // Change the font family of textual buttons
    topBarElevationShadowEnabled?: boolean; // default: true. Disables TopBar elevation shadow on Lolipop and above
    statusBarColor?: string; // change the color of the status bar.
    collapsingToolBarImage?: any; // Collapsing Toolbar image. Either use a url or require a local image.
    collapsingToolBarCollapsedColor?: string; // Collapsing Toolbar scrim color.
    navBarTextFontBold?: boolean; // Optional. Set the title to bold.
    navBarHeight?: number; // Optional, set the navBar height in pixels.
    topTabsHeight?: number; // Optional, set topTabs height in pixels.
    topBarBorderColor?: string; // Optional, set a flat border under the TopBar.
    topBarBorderWidth?: number; // Optional, set the width of the border.
  }

  export interface NotificationOptions {
    screen: string; // unique ID registered with Navigation.registerScreen
    passProps?: object; // simple serializable object that will pass as props to the in-app notification (optional)
    autoDismissTimerSec?: number; // auto dismiss notification in seconds
  }
  export interface NavigationEvent {
    navigatorEventID: string;
    unselectedTabIndex: number;
    id: 'bottomTabSelected' | 'bottomTabReselected' | 'willAppear' | 'didAppear' | string;
    selectedTabIndex: number;
    type: 'NavBarButtonPress';
  }
  export interface Navigator {
    push: (options: PushedScreen) => any;
    pop: (options?: { animated?: boolean, animatedType: string }) => any;
    popToRoot: (options?: { animated?: boolean, animatedType: string }) => any;
    resetTo: (options: ModalScreen) => any;
    showModal: (options: ModalScreen) => any;
    dismissModal: (options?: { animationType?: string }) => any;
    dismissMeasurementFlow: () => any;
    dismissAllModals: (options?: { animationType?: string }) => any;
    showLightBox: (options: LightBox) => any;
    dismissLightBox: () => any;
    handleDeepLink: (options: { link: string }) => any;
    setOnNavigatorEvent: (callback: (event: NavigationEvent) => any) => any;
    setButtons: (options: NavigatorButtons & { animated?: boolean }) => any;
    setTitle: (options: { title: string }) => any;
    toggleDrawer: (options: { side: string, animated?: boolean, to?: string }) => any;
    toggleTabs: (options: { to: string; animated?: boolean }) => any;
    setTabBadge: (options: { tabIndex?: number, badge: number }) => any;
    switchToTab: (options: { tabIndex: number }) => any;
    toggleNavBar: (options: { to: string, animated?: boolean }) => any;
    setDrawerEnabled: (options: { side: 'left' | 'right', enabled: boolean }) => void;
    setStyle: (options: StyleOptions) => void;
    showInAppNotification: (options: NotificationOptions) => void;
  }
}
