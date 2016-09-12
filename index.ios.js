/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Root from './app/root';

class train extends Component {
  render() {
    return <Root />;
  }
}

AppRegistry.registerComponent('train', () => train);
