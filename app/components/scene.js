import React, {
  Component,
  PropTypes
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  NavigationExperimental
}
from 'react-native';

const {
  PropTypes: NavigationPropTypes
} = NavigationExperimental


import appNavigationContainer from './appNavigationContainer';

const TabBar = appNavigationContainer(require('./tabBar'));
import Calendar from '../pages/calendar';
import List from '../pages/list';
import Station from '../pages/station';


class Scenes extends Component {
  static propTypes = {
    ...NavigationPropTypes.SceneRendererProps,
    navigate: PropTypes.func.isRequired,
  };

  constructor(props: Object, context: any) {
    super(props, context);
    this._exit = this._exit.bind(this);
    this._popRoute = this._popRoute.bind(this);
    this._pushRoute = this._pushRoute.bind(this);
  }

  render() {
    let t = this;
    let scene = t.props.scene;
    let sceneKey = scene.key;
    let subComponents = null;
    console.log(sceneKey)
    switch (sceneKey) {
      case "scene_calendarPicker":
        subComponents = <Calendar {...t.props}/>
        break;
      case "scene_station":
        subComponents = <Station {...t.props}/>
        break;
      
      case "scene_list":
        subComponents = <List {...t.props}/>
        break;

      default:
        subComponents = <TabBar {...t.props}/>
        break;
    }
    return <View style={styles.container}>{subComponents}</View>;
  }

  _render(){
    
  }

  _pushRoute(): void {
    // Just push a route with a new unique key.
    const route = {key: '[' + this.props.scenes.length + ']-' + Date.now()};
    this.props.navigate({type: 'push', route});
  }

  _popRoute(): void {
    this.props.navigate({type: 'pop'});
  }

  _exit(): void {
    this.props.navigate({type: 'exit'});
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    }
});
module.exports = Scenes;
//export default  Scenes;
