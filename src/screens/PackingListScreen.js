import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'

import ListInput from '../components/ListInput'

export default class PackingListScreen extends Component {
  state = {
    items: [],
    inputValue: '',
  }

  addNewItem = () => {
    const { items, inputValue } = this.state
    const newItems = [...items, { name: inputValue, checked: false }]

    this.setState({
      items: newItems,
      inputValue: '',
    })
  }

  clearItems = () => {
    this.setState(() => ({
      items: [],
    }))
  }

  checkItem = selectedItem => {
    const selectedName = selectedItem.name
    const newItems = this.state.items.map(item => {
      const { name, checked } = item
      return name === selectedName ? { name: name, checked: !checked } : item
    })

    this.setState(() => ({
      items: newItems,
    }))
  }

  listItems = (item, index) => {
    const backgroundColor = item.checked ? 'green' : 'red'
    return (
      <TouchableOpacity
        key={index}
        style={{ backgroundColor }}
        onPress={() => this.checkItem(item)}
      >
        <Text style={styles.theValue}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { inputValue, items } = this.state
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ListInput
            addNewItem={this.addNewItem}
            clearItems={this.clearItems}
            onChangeText={value => this.setState(() => ({ inputValue: value }))}
            value={inputValue}
          />
        </View>
        <View
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderColor: 'dodgerblue',
            paddingTop: 5,
          }}
        >
          <FlatList
            data={items}
            keyExtractor={item => item.name}
            renderItem={({ item, index }) => this.listItems(item, index)}
          />
        </View>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    width: '50%',
    borderWidth: 2,
    borderColor: 'dodgerblue',
  },
  theValue: {
    color: 'white',
    margin: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
