import React, {
  Component,
  PropTypes
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  NavigationExperimental
}
from 'react-native';

const {
  PropTypes: NavigationPropTypes
} = NavigationExperimental


class Tab extends Component {

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    route: NavigationPropTypes.navigationRoute.isRequired,
    selected: PropTypes.bool.isRequired,
  };

  constructor(props: Object, context: any) {
    super(props, context);
    this._onPress = this._onPress.bind(this);
  }

  render(): ReactElement {
    const style = [styles.tabText];
    if (this.props.selected) {
      style.push(styles.tabSelected);
    }
    return (
      <TouchableOpacity style={styles.tab} onPress={this._onPress}>
        <Text style={style}>
          {this.props.route.key}
        </Text>
      </TouchableOpacity>
    );
  }

  _onPress() {
    this.props.navigate({type: 'selectTab', tabKey: this.props.route.key});
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  navigatorCardStack: {
    flex: 20
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  tabText: {
    color: '#222',
    fontWeight: '500',
  },
  tabSelected: {
    color: 'blue',
  },
  header:{
    backgroundColor:'#1a9bf1',
  }
});

module.exports = Tab;