/**
 * chon_den
 */
'use strict';

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	Text,
	View,
}
from 'react-native';

import TabBar from 'react-native-xtabbar';
import List from './list.js';
import Query from '../pages/query';

import Calendar from '../pages/calendar';

class tabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badge: 7,
        }
    }

    handleItemPress(key) {
        this.props.navigate({
            type: 'selectTab',
            tabKey: key
        });
    }

    render() {
        let t = this;
       
        return (
            <TabBar style={styles.content}
                navFontSize={12}
                navTextColor="#666"
                navTextColorSelected="#1a9bf1">
                <TabBar.Item
                    icon={require('./image/icon1.png')}
                    selectedIcon={require('./image/icon1_hl.png')}
                    onPress={t.handleItemPress.bind(t,'bar1')}
                    title='车票预订'>
                    <View style={styles.text}>
                        {t._renderBar1(t.props)}
                    </View>
                </TabBar.Item>

                <TabBar.Item
                    icon={require('./image/icon2.png')}
                    selectedIcon={require('./image/icon2_hl.png')}
                    badge={7}
                    onPress={t.handleItemPress.bind(t,'bar2')}
                    title='我的行程'>
                    <List />
                </TabBar.Item>

               

                <TabBar.Item
                    icon={require('./image/icon3.png')}
                    selectedIcon={require('./image/icon3_hl.png')}
                    badge=' '
                    onPress={t.handleItemPress.bind(t,'bar3')}
                    title='旅行服务'>
                    <View style={styles.text}>
                        <Text style={{fontSize: 18}}>Find</Text>
                    </View>
                </TabBar.Item>

                <TabBar.Item
                    style={styles.item}
                    icon={require('./image/icon4.png')}
                    selectedIcon={require('./image/icon4_hl.png')}
                    onPress={t.handleItemPress.bind(t,'bar4')}
                    title='个人中心'>
                    <View style={styles.text}>
                        <Text style={{fontSize: 18}}>Me</Text>
                    </View>
                </TabBar.Item>
            </TabBar>

        );
    }

    _renderBar1(props){
        let subComponents = null;
        let sceneKey = props.scene.key;
        switch(sceneKey){
            case "scene_calendarPicker":
                subComponents = <Calendar {...props}/>
                break;
            default:
                subComponents = <Query {...props}/>
            break;
        }

        return subComponents;
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    item:{
    }
});

module.exports = tabBar;
