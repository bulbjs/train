import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    NavigationExperimental
}
from 'react-native';



const {
    PropTypes: NavigationPropTypes
} = NavigationExperimental



class Scenes extends Component {
    static propTypes = {
        ...NavigationPropTypes.SceneRendererProps,
        navigate: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: true,
            value: '',
            fromSite:'杭州',
            toSite:'上海',
            date:new Date()
        };

        this._exit = this._exit.bind(this);
        this._popRoute = this._popRoute.bind(this);
    }

    render() {
        let t = this;
        return  (<ScrollView>
                <View style={styles.row}>
                    <View style={styles.flex}>
                        <Text style = {styles.lable}>出发地</Text> 
                        <Text style = {styles.inputs}>{t.state.fromSite}</Text> 
                    </View> 
                    <View style={styles.flex}>
                        <Text style = {styles.icon}>icon</Text> 
                    </View> 
                    <View style={styles.flex}>
                        <Text  style = {styles.lable}>目的地</Text> 
                        <Text  style = {styles.inputs}>{t.state.toSite}</Text> 
                    </View> 
                </View>

                <TouchableOpacity
                    onPress={t.handleCalendar.bind(t)}>
                    <View style={styles.row}>
                        <Text>出发日期</Text>
                        <Text>9月28日</Text>
                        <Text>明天</Text>
                        <Text>星期四</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    handleCalendar() {
        let t = this;
        const route = {
            key: 'calendarPicker'
        };
        t.props.navigate({
            type: 'push',
            route
        });
    }

    handleChangeSite(type, value) {
        if (type == 'from') {
            this.setState({
                fromSite: value
            });
        } else if (type == 'to') {
            this.setState({
                toSite: value
            });
        }
    }

    _popRoute() {
        this.props.navigate({
            type: 'pop'
        });
    }

    _exit() {
        this.props.navigate({
            type: 'exit'
        });
    }
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    flex: {
        flex: 1
    },
    lable: {
        height: 30,
        lineHeight:30,
        textAlign:'center',
        color:'#1a9bf1'
    },
    icon:{
        textAlign:'center',
        lineHeight:70,
    },
    inputs: {
        height: 30,
        lineHeight:30,
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold'
    },
    date: {
        backgroundColor: '#f0f',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    item: {}
});

module.exports = Scenes;