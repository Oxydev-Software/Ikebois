import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { styles } from './Styles.js';

import { CheckBox, Button } from 'react-native-elements';

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
    const { code, name, id } = this.props.navigation.state.params;
    const { phases } = this.state;
    return (
      <View>
        <Text style={styles.title}>
          {name} - {code}
        </Text>
        {Object.keys(phases).map(key => {
          return (
            <CheckBox
              key={key}
              title={`${phases[key].type} - ${phases[key].weight} - ${key}`}
              onPress={() => {
                this.setState(previousState => getNewState(previousState, key));
              }}
              checked={phases[key].conform}
            />
          );
        })}
        <Button
          title="VALIDER"
          backgroundColor="#2767AC"
          raised
          onPress={() => {
            let result = getResult(phases);
            validateProduct(id, result);
            Alert.alert(
              isConform(result)
                ? 'Le produit est marqué comme conforme.'
                : 'Il faut arrêter la chaîne de production!'
            );
          }}
        />
      </View>
    );
  }
}

const validateProduct = (id, result) => {
  const ID_DU_PRODUIT = id;
  const IS_CONFORM = isConform(result);
  fetch(
    `http://linkyu.alwaysdata.net/ikebois/list.php?id=${
      ID_DU_PRODUIT
    }&conforme=${IS_CONFORM}`
  );
};

const isConform = result => (result > 0.85 ? 1 : 0);

const getResult = phases => {
  let result = 0;
  Object.keys(phases).map(key => {
    let phase = phases[key];
    result += phase.conform ? phase.weight : 0;
  });
  return result / 5.95;
};

const getNewState = (previousState, key) => {
  return {
    phases: {
      ...previousState.phases,
      [key]: {
        ...previousState.phases[key],
        conform: !previousState.phases[key].conform
      }
    }
  };
};
