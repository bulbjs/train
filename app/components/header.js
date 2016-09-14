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
	CardStack: NavigationCardStack,
	Header: NavigationHeader,
	PropTypes: NavigationPropTypes,
	StateUtils: NavigationStateUtils,
} = NavigationExperimental;



class Header extends Component {
  static propTypes = {
    ...NavigationPropTypes.SceneRendererProps,
    navigate: PropTypes.func.isRequired,
  };

  constructor(props: Object, context: any) {
    super(props, context);
    this._back = this._back.bind(this);
    this._renderTitleComponent = this._renderTitleComponent.bind(this);
  }

  componentDidMount(){
    
  }

  render(): ReactElement {
    return (
      <NavigationHeader ref= "knb"
        {...this.props}
        style={styles.header}
        renderTitleComponent={this._renderTitleComponent}
        renderRightComponent={this._renderRightComponent}
        onNavigateBack={this._back}
      />
    );
  }

  _back(): void {
    this.props.navigate({type: 'pop'});
  }

  _renderTitleComponent(props: Object): ReactElement {
    return (
      <NavigationHeader.Title>
        {props.scene.route.key}
      </NavigationHeader.Title>
    );
  }

  _renderRightComponent(props: Object): ReactElement {
    return (
      <NavigationHeader.Title>
        右侧
      </NavigationHeader.Title>
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
module.exports = Header;