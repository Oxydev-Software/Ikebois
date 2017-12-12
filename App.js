import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'powderblue' }} />
        <View style={{ flex: 1, backgroundColor: 'steelblue' }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={{ flex: 4, backgroundColor: 'skyblue' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2767AC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 18
  }
});
