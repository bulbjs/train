import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    ListView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    NavigationExperimental
}
from 'react-native';

const {
    PropTypes: NavigationPropTypes
} = NavigationExperimental

import stationSource from '../components/station';

class Station extends Component {
    static propTypes = {
        ...NavigationPropTypes.SceneRendererProps,
        navigate: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        /*var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //bjb|北京北|VAP|beijingbei|bjb|0
       
        this.state = {
            dataSource: a,
        };*/

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>{
                return r1 !== r2
            } 
        });
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
        };
    }

    render() {
        let t = this;
        let sceneKey = t.props.scene.key;
        
        return (

            <View>
                <View style={styles.searchRow}>
                    <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    placeholder="请输入车站名称(如北京,bj、beijing)"
                    onChangeText={t.handleSearch.bind(t)}
                    style={styles.searchTextInput}
                  />
                </View>
                <ScrollView style={styles.scroll}>
                 <ListView ref='listView'
                    enableEmptySections={true}
                    dataSource={t.state.dataSource}
                    renderRow={t._renderRow.bind(t)}
                    renderSeparator={t._renderSeparator}
                  />
                </ScrollView>
            </View>);
    }

    handleSearch(keyWord){
        let t = this;
        if (t.tid) {
            clearTimeout(t.tid)
        }

        t.tid = setTimeout(function() {
            let station = stationSource.find(keyWord);
            t.setState({
                dataSource: t.ds.cloneWithRows(station),
            });
        }, 300);
        

    }

    handlePressRow(rowData){
        this.props.navigate({
            type: 'pop',
            station: {
                kind: this.props.scene.route.kind,
                site: rowData
            }
        });
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (<TouchableHighlight 
            underlayColor="#eee"
            onPress={this.handlePressRow.bind(this,rowData)}>
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {rowData}
                </Text>
              </View>
            </View> 
            </TouchableHighlight>);
    }



    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return ( <View key = {
                `${sectionID}-${rowID}`
            }
            style = {
                {
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }
            }
            />
        );
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll:{
        height:Dimensions.get('window').height-40,
    },
    searchRow: {
        paddingTop: 10,
        paddingBottom: 10,
        padding: 10,
        backgroundColor:'#eee'
    },
    searchTextInput: {
        backgroundColor: 'white',
        borderColor:'#ccc',
        borderWidth:1,
        height: 40,
        paddingLeft: 28,
    },

    row: {
        flexDirection: 'row',
        padding: 15,
    },
    text: {
        flex: 1,
    },
});

module.exports = Station;