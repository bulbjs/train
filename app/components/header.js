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
    }
    render() {
        let t =this;
        return (
            <NavigationHeader
                {...t.props}
                style={styles.header}
                renderTitleComponent={t._renderTitleComponent.bind(t)}
                renderRightComponent={t._renderRightComponent.bind(t)}
                onNavigateBack={t._back.bind(t)}
            />
        );
    }

    _back(): void {
        this.props.navigate({
            type: 'pop'
        });
    }

    _renderTitleComponent(props) {
        
        let routeKey = props.scene.route.key;
        if (routeKey == 'station'){
            if (props.scene.route.kind == 'from'){
                routeKey = '请选择出发地'
            }else{
                routeKey = '请选择目的地'
            }
        }

        return (
            <NavigationHeader.Title textStyle={styles.text}>
                {routeKey}
            </NavigationHeader.Title>
        );
    }

    _renderRightComponent(props) {
        return null;
        /*return (
            <NavigationHeader.Title>
            right
            </NavigationHeader.Title>
        );*/
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1a9bf1',
    },
    text:{
        color: '#fff',
        //color: 'rgba(255, 255, 255, .9)',
    }
});
module.exports = Header;