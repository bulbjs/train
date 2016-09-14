import React, {
  Component,
  PropTypes
} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  NavigationExperimental
}
from 'react-native';


import Tab from './tab';

const {
  PropTypes: NavigationPropTypes
} = NavigationExperimental


class Tabs extends Component {
	static propTypes = {
		navigationState: NavigationPropTypes.navigationState.isRequired,
		navigate: PropTypes.func.isRequired,
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<View style={styles.tabs}>
				{this.props.navigationState.routes.map(this._renderTab, this)}
			</View>
		);
	}

	_renderTab(route, index) {
		return (
			<Tab
				key={route.key}
				route={route}
				selected={this.props.navigationState.index === index}
			/>
		);
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

module.exports = Tabs;