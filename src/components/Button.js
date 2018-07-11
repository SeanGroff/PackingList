import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class Button extends Component {
  render() {
    const backgroundColor = this.props.clear ? 'gray' : 'green'
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  buttonText: {
    padding: 5,
    color: 'white',
  },
})
