import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { STEP_PAGE } from './PAGES.js';
import { styles } from './Styles.js';

export default class ProductPage extends Component {
  static navigationOptions = {
    title: 'PRODUCT'
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: ''
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    return fetch('http://linkyu.alwaysdata.net/ikebois/list.php')
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson)
          },
          function() {
            // In this block you can do something with new state.
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemDataName = item.name.toUpperCase();
      const itemDataCode = item.code.toUpperCase();
      const textData = text.toUpperCase();
      return (
        itemDataName.indexOf(textData) > -1 ||
        itemDataCode.indexOf(textData) > -1
      );
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000'
        }}
      />
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />

        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={rowData => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigate(STEP_PAGE, { name: rowData.name, code: rowData.code })
              }
            >
              <View style={styles.listViewItem}>
                <Text>{rowData.name}</Text>
                <Text>{rowData.code}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}
