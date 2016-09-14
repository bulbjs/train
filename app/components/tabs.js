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

import appNavigationContainer from './appNavigationContainer';
const Tab = appNavigationContainer(require('./tab'));

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
  tabs: {
    flex: 1,
    flexDirection: 'row',
  }
});

module.exports = Tabs;