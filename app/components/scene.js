import React, {
  Component,
  PropTypes
} from 'react';

import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  NavigationExperimental
}
from 'react-native';

const {
  PropTypes: NavigationPropTypes
} = NavigationExperimental


import NavigationExampleRow from './NavigationExampleRow';


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

  render(): ReactElement {
    return (
      <ScrollView>
        <NavigationExampleRow
          text="Push Route"
          onPress={this._pushRoute}
        />
        <NavigationExampleRow
          text="Pop Route"
          onPress={this._popRoute}
        />
        <NavigationExampleRow
          text="Exit Header + Scenes + Tabs Example"
          onPress={this._exit}
        />
      </ScrollView>
    );
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

module.exports = Scenes;
//export default  Scenes;
