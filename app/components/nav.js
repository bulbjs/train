/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';

import React, {
  Component,
  PropTypes
} from 'react';

import {
  NavigationExperimental,
  StyleSheet,
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
// Define your own controlled navigator.
//const YourNavigator = appNavigationContainer(require('./navigator'));
//
const Navigator = require('./navigator');

// First Step.
// Define what app navigation state will look like.
function createAppNavigationState() {
  return  {
    // Three tabs.
    tabs: {
      index: 0,
      routes: [
        {key: 'apple'},
        {key: 'banana'},
        {key: 'orange'},
      ],
    },
    // Scenes for the `apple` tab.
    apple: {
      index: 0,
      routes: [{key: 'Apple Home'}],
      rightButton:'右侧组件'
    },
    // Scenes for the `banana` tab.
    banana: {
      index: 0,
      routes: [{key: 'Banana Home'}],
    },
    // Scenes for the `orange` tab.
    orange: {
      index: 0,
      routes: [{key: 'Orange Home'}],
    },
  };
}

// Next step.
// Define what app navigation state shall be updated.
function updateAppNavigationState(
  state: Object,
  action: Object,
): Object {
  let {type} = action;
  if (type === 'BackAction') {
    type = 'pop';
  }

  switch (type) {
    case 'push': {
      // Push a route into the scenes stack.
      const route: Object = action.route;
      const {tabs} = state;
      const tabKey = tabs.routes[tabs.index].key;
      const scenes = state[tabKey];
      const nextScenes = NavigationStateUtils.push(scenes, route);
      if (scenes !== nextScenes) {
        return {
          ...state,
          [tabKey]: nextScenes,
        };
      }
      break;
    }

    case 'pop': {
      // Pops a route from the scenes stack.
      const {tabs} = state;
      const tabKey = tabs.routes[tabs.index].key;
      const scenes = state[tabKey];
      const nextScenes = NavigationStateUtils.pop(scenes);
      if (scenes !== nextScenes) {
        return {
          ...state,
          [tabKey]: nextScenes,
        };
      }
      break;
    }

    case 'selectTab': {
      // Switches the tab.
      const tabKey: string = action.tabKey;
      const tabs = NavigationStateUtils.jumpTo(state.tabs, tabKey);
      if (tabs !== state.tabs) {
        return {
          ...state,
          tabs,
        };
      }
    }
  }
  return state;
}




// Next step.
// Define a component for your application that owns the navigation state.
class YourApplication extends Component {

  static propTypes = {
    onExampleExit: PropTypes.func,
  };

  // This sets up the initial navigation state.
  constructor(props, context) {
    super(props, context);
    // This sets up the initial navigation state.
    this.state = createAppNavigationState();
    this._navigate = this._navigate.bind(this);
  }

  render(): ReactElement {
    // User your own navigator (see next step).
    return (
      <Navigator
        appNavigationState={this.state}
        navigate={this._navigate}
      />
    );
  }

  // This public method is optional. If exists, the UI explorer will call it
  // the "back button" is pressed. Normally this is the cases for Android only.
  handleBackAction(): boolean {
    return this._navigate({type: 'pop'});
  }

  // This handles the navigation state changes. You're free and responsible
  // to define the API that changes that navigation state. In this exmaple,
  // we'd simply use a `updateAppNavigationState` to update the navigation
  // state.
  _navigate(action: Object): void {
    if (action.type === 'exit') {
      // Exits the example. `this.props.onExampleExit` is provided
      // by the UI Explorer.
      this.props.onExampleExit && this.props.onExampleExit();
      return;
    }

    const state = updateAppNavigationState(
      this.state,
      action,
    );

    // `updateAppNavigationState` (which uses NavigationStateUtils) gives you
    // back the same `state` if nothing has changed. You could use
    // that to avoid redundant re-rendering.
    if (this.state !== state) {
      this.setState(state);
    }
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

module.exports = YourApplication;
