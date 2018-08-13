import React, { PureComponent } from 'react'
import SplashScreen from "react-native-splash-screen";
import {AsyncStorage,BackHandler,Animated, Easing } from 'react-native';
import MainStackRouter from "./routers/MainStackRouter";
import Storage from 'react-native-storage';
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'



class Router extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide()//隐藏启动屏
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('rootRouterhardwareBackPress', this.backHandle)
  }

  componentWillMount() {
    initGlobalStorage()    //init react-native-storage
    console.disableYellowBox = true;// 禁用屏幕底部的黄色警告
    BackHandler.addEventListener('rootRouterhardwareBackPress', this.backHandle)
  }

  /**
   * return: bool [true: 不返回主界面, false: 返回主界面]
   */
  backHandle = () => {
    /**
     * todo 在这里写判断是否android点击返回键 2秒内逻辑
     */
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return false
    }
    this.props.dispatch(NavigationActions.back())
    return true
  }


  render() {
    const {dispatch, router} = this.props
    const navigation = addNavigationHelpers({dispatch, state: router})
    return (<MainStackRouter navigation={addNavigationHelpers({dispatch, state: router})}/>)
  }
}

function mapStateToProps(state) {
  return {
    router:state.router
  };
}
export default connect(mapStateToProps)(Router)





export function routerReducer(state, action = {}) {
  return MainStackRouter.router.getStateForAction(action, state)
}
function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

let initGlobalStorage=()=>{
  let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {}
  })
  GLOBAL.storage = storage;
}



