import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
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
            fromSite:'2',
            toSite:'1',
            date:new Date()
        };

        this._exit = this._exit.bind(this);
        this._popRoute = this._popRoute.bind(this);
    }

    render() {
        let t = this;
        let sceneKey = t.props.scene.key;
        
        return (<ScrollView>
            
            <View style={styles.row}>
                <View style={styles.flex}>
                    <Text style = {styles.lable}>出发地</Text> 
                    <Text  style = {styles.inputs}>{t.state.fromSite}</Text> 
                   {/* <TextInput style = {styles.inputs} 
                    value = {t.state.fromSite}
                    returnKeyType = "search"
                    onChangeText = {t.handleChangeSite.bind(t,'from')}
                    placeholder="起点车站"/>*/}
                </View> 
                <View style={styles.flex}>
                    <Text>icon</Text> 
                </View> 
                <View style={styles.flex}>
                    <Text  style = {styles.lable}>目的地</Text> 
                    <Text  style = {styles.inputs}>{t.state.toSite}</Text> 
                   {/* <TextInput style = {styles.inputs} 
                    value = {t.state.toSite}
                    returnKeyType = "search"
                    onChangeText = {t.handleChangeSite.bind(t,'to')}
                    placeholder="终点车站"/>*/}
                </View> 
            </View>

            <TouchableOpacity
                onPress={this.handleCalendar.bind(this)}>
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

    onDateChange(date) {
        this.setState({
            date: date
        });
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
        height: 40,
        lineHeight:40,
        textAlign:'center'
    },
    inputs: {
        height: 40,
        textAlign:'center',
        marginLeft: 5,
        paddingLeft: 5,
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