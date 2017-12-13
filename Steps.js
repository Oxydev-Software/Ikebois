import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from './Styles.js';

import { CheckBox } from 'react-native-elements';

export default class StepPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phases: {
        PR: {
          type: 'Préparation',
          weight: 1,
          conform: false
        },
        DC1: {
          type: 'Découpe 1',
          weight: 1,
          conform: false
        },
        DC2: {
          type: 'Découpe 2',
          weight: 1,
          conform: false
        },
        PE: {
          type: 'Peinture',
          weight: 0.8,
          conform: false
        },
        AS: {
          type: 'Assemblage',
          weight: 0.9,
          conform: false
        },
        RC: {
          type: 'Réception',
          weight: 0.75,
          conform: false
        },
        EM: {
          type: 'Emballage',
          weight: 0.5,
          conform: false
        }
      }
    };
  }
  static navigationOptions = {
    title: 'STEPS'
  };
  render() {
    const { code, name } = this.props.navigation.state.params;
    const { type, weight, conform } = this.state.phases.PR;
    return (
      <View>
        <Text style={styles.title}>
          {name} - {code}
        </Text>
        <CheckBox
          title={`${type} - ${weight}`}
          onPress={() => {
            this.setState(previousState => getNewState(previousState));
          }}
          checked={conform}
        />
      </View>
    );
  }
}

const getNewState = previousState => {
  return {
    phases: {
      ...previousState.phases,
      PR: {
        ...previousState.phases.PR,
        conform: !previousState.phases.PR.conform
      }
    }
  };
};
