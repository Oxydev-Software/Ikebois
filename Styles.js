import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    flex: 1,
    margin: 7
  },
  title: {
    textAlign: 'center',
    fontSize: 28
  },
  listViewItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    margin: 10
  },
  listViewItemText: {
    fontSize: 18
  },
  TextInputStyleClass: {
    margin: 20,
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    backgroundColor: '#FFFFFF'
  }
});
