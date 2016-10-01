import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    NavigationExperimental
}
from 'react-native';

import {Button} from 'react-native-buttons';
//import Toast from 'react-native-smart-toast';
//import Toast from 'react-native-root-toast';
//var Toast = require('react-native-toast');
const {
    PropTypes: NavigationPropTypes
} = NavigationExperimental

var moment = require('moment');

function week(d){
   let days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
   return days[d];
}

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
            toSite:'上海',
            date:new Date()
        };

        this._exit = this._exit.bind(this);
        this._popRoute = this._popRoute.bind(this);
    }

    render() {
        let t = this;
        let appState = t.props.appNavigationState;
        return  (<ScrollView>
                <View style={[styles.row,styles.site]}>
                    <View style={styles.flex}>
                        <Text style = {styles.lable}>出发地</Text> 
                        <Text style = {styles.inputs} onPress={t.handleSite.bind(t,'from')}>{appState.fromSite}</Text> 
                    </View> 
                    <View style={styles.flex}>
                        <Text style = {styles.icon}>icon</Text> 
                    </View> 
                    <View style={styles.flex}>
                        <Text  style = {styles.lable}>目的地</Text> 
                        <Text  style = {styles.inputs} onPress={t.handleSite.bind(t,'to')}>{appState.toSite}</Text> 
                    </View> 
                </View>

                <TouchableOpacity
                    onPress={t.handleCalendar.bind(t)}>
                    <View style={[styles.row,styles.calendar]}>
                        <Text>出发日期</Text>
                        <Text style={styles.date}>{moment(appState.calendar).format('YYYY年MM月DD') }</Text>
                        <Text>{week(moment(appState.calendar).format('E'))}</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Button
                    selfStyle={{width:Dimensions.get('window').width-30,marginLeft:15,marginTop:15}}
                    type="surface"
                    size="large"
                    onPress={t.handleSearch.bind(t)}
                    theme="#1a9bf1">搜索</Button>
                </View>

                 

            </ScrollView>
        );
    }

    handleSite(kind) {

        let t = this;
        const route = {
            key: 'station',
            kind:kind
        };
        t.props.navigate({
            type: 'push',
            route
        });
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

    handleSearch() {
       /* Alert.alert(
            'Alert Title',
            'alertMessage',
            []
        )*/
        let t = this;
        const route = {
            key: 'list'
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
        flexDirection: 'row',
        justifyContent:'center',
    },
    flex: {
        flex: 1
    },
    site:{
        marginTop:10,
    },
    calendar: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#ccc',
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
        fontSize:20,
        color:'#f00',
        marginLeft:5,
        marginRight:5
    },
    lh1_5:{
        height:30,
        backgroundColor: '#ff0',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        flex: 1,
    },
    item: {}
});

module.exports = Scenes;