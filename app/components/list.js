'use strict'

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
    TouchableHighlight,
	Text,
	View,
	ListView
}
from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.array = [];
        for (let i = 0; i < 150; i++) {
            this.array[i] = i;
        }
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.ds.cloneWithRows(this.array)}
                renderRow1={(rowData) => <Text style={{padding: 10}}>position: {rowData}</Text>}
                renderRow={this._renderRow}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        //var rowHash = Math.abs(hashCode(rowData));
        //var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
        return (
          <TouchableHighlight>
            <View>
              <View style={styles.row}>
                <View style={styles.row1}>
                    <Text style={styles.col}>T169{rowData}</Text>
                    <Text style={styles.col}>8:07</Text>
                    <Text style={styles.col}>Y:184</Text>
                </View>
               <View style={styles.row1}>
                    <Text style={styles.col}>12:45</Text>
                    <Text style={styles.col}>杭州东</Text>
                    <Text style={styles.col}>硬卧</Text>
                </View>
                <View style={styles.row1}>
                    <Text style={styles.col}>20:53</Text>
                    <Text style={styles.col}>吉安</Text>
                    <Text style={styles.col}>30张</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding:10,
        borderTopWidth:1,
        borderTopColor:'#999'
    },
    row1: {
        flex:1,
        justifyContent: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    col:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor: '#f00',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
});
