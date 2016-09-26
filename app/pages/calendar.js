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

var CalendarPicker = require('react-native-calendar-picker');

const {
    PropTypes: NavigationPropTypes
} = NavigationExperimental


const customDayHeadings = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const customMonthNames = ['1月', '2月', '3月', '4月', '5月',
  '6月', '7月', '8月', '9月', '10月', '11月', '12月'];


class Scenes extends Component {
    static propTypes = {
        ...NavigationPropTypes.SceneRendererProps,
        navigate: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            date:new Date()
        };
    }

    render() {
        let t = this;
        let sceneKey = t.props.scene.key;
        return (<ScrollView>
            
            <View style={styles.row}>
                 <CalendarPicker 
                months={customMonthNames}
                weekdays={customDayHeadings}
                selectedDate={this.state.date}
                onDateChange={this.onDateChange.bind(t)}
                previousTitle="<"
                nextTitle=">"
                selectedDayColor="#f90"
                screenWidth={Dimensions.get('window').width}
                selectedBackgroundColor={'#5ce600'} />
            </View>


            </ScrollView>
        );
    }

    onDateChange(date) {
       /* this.setState({
            date: date
        });*/
        this.props.navigate({
            type: 'pop',
            calendar: date.getTime()
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