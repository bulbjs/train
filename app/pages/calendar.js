import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
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
    '6月', '7月', '8月', '9月', '10月', '11月', '12月'
];

class Scenes extends Component {
    static propTypes = {
        ...NavigationPropTypes.SceneRendererProps,
        navigate: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            date: new Date()
        };
    }

    render() {
        let t = this;
        let sceneKey = t.props.scene.key;
        return (<ScrollView>
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
            </ScrollView>);
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
}


const styles = StyleSheet.create({

});

module.exports = Scenes;