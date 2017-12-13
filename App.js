import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import ProductPage from './Products';
import StepPage from './Steps';
import { PRODUCT_PAGE, STEP_PAGE } from './PAGES.js';
import { StackNavigator } from 'react-navigation';

const SimpleApp = StackNavigator({
  PRODUCT_PAGE: { screen: ProductPage },
  STEP_PAGE: { screen: StepPage }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
