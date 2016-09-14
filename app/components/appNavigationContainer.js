// Next step.
// Defines a helper function that creates a HOC (higher-order-component)
// which provides a function `navigate` through component props. The
// `navigate` function will be used to invoke navigation changes.
// This serves a convenient way for a component to navigate.

import React, { Component,PropTypes } from 'react';

function appNavigationContainer(ComponentClass) {
  const key = '_yourAppNavigationContainerNavigateCall';

  class Container extends Component {
    static contextTypes = {
      [key]: PropTypes.func,
    };

    static childContextTypes = {
      [key]: PropTypes.func.isRequired,
    };

    static propTypes = {
      navigate: PropTypes.func,
    };

    getChildContext(): Object {
      return {
        [key]: this.context[key] || this.props.navigate,
      };
    }

    render(): ReactElement {
      const navigate = this.context[key] || this.props.navigate;
      return <ComponentClass {...this.props} navigate={navigate} />;
    }
  }

  return Container;
}

module.exports = appNavigationContainer;