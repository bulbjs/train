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
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

import appNavigationContainer from './appNavigationContainer';

// Next step.
// Define your own header.
const Header = appNavigationContainer(require('./header'));
// Next step.
// Define your own scene.
const Scene = appNavigationContainer(require('./scene'));
// Next step.
// Define your own tabs.
const Tabs = appNavigationContainer(require('./tabs'));

const TabBar = appNavigationContainer(require('./tabBar'));

class Navigator extends Component {
  static propTypes = {
    appNavigationState: PropTypes.shape({
      bar1: NavigationPropTypes.navigationState.isRequired,
      bar2: NavigationPropTypes.navigationState.isRequired,
      bar3: NavigationPropTypes.navigationState.isRequired,
      bar4: NavigationPropTypes.navigationState.isRequired,
    }),
    navigate: PropTypes.func.isRequired,
  };

  // This sets up the methods (e.g. Pop, Push) for navigation.
  constructor(props: any, context: any) {
    super(props, context);
    this._back = this._back.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  // Now use the `NavigationCardStack` to render the scenes.
  render(): ReactElement {
    const {appNavigationState} = this.props;
    const {tabs} = appNavigationState;
    const tabKey = tabs.routes[tabs.index].key;
    const scenes = appNavigationState[tabKey];

    return (
      <View style={styles.navigator}>
        <NavigationCardStack
          key={'stack_' + tabKey}
          onNavigateBack={this._back}
          navigationState={scenes}
          renderHeader={this._renderHeader}
          renderScene={this._renderScene}
          style={styles.navigatorCardStack}
        />
      </View>
    );
  }

  // Render the header.
  // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
  // as type `NavigationSceneRendererProps`.
  _renderHeader(sceneProps) {
    return (
      <Header
        {...sceneProps}
      />
    );
  }

  // Render a scene for route.
  // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
  // as type `NavigationSceneRendererProps`.
  _renderScene(sceneProps) {
    return <TabBar {...sceneProps}/>
    /*return (
      <Scene
        {...sceneProps}
      />
    );*/
  }

  _back() {
    this.props.navigate({type: 'pop'});
  }
}


const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  navigatorCardStack: {
    backgroundColor: '#f00',
  }
});
module.exports = appNavigationContainer(Navigator);