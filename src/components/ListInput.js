import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Button from './Button'

export default class ListInput extends Component {
  render() {
    const { addNewItem, clearItems, onChangeText, value } = this.props
    return (
      <View style={styles.inputRow}>
        <TextInput
          autoFocus
          ref={ref => (this.input = ref)}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={addNewItem}
        />
        <Button onPress={addNewItem} text="Add" />
        <Button onPress={clearItems} text="Clear" clear />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '50%',
    borderWidth: 2,
    borderColor: 'dodgerblue',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
