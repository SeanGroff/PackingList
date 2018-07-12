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
import { Subscribe } from 'unstated'
import { RootStore } from '../app/RootComponent'

import ListInput from '../components/ListInput'

export default class PackingListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Packing List',
      headerRight: (
        <Text
          style={{ paddingRight: 10 }}
          onPress={() => navigation.navigate('Input')}
        >
          Input
        </Text>
      ),
    }
  }

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

  listItems = (item, index, store) => {
    const backgroundColor = item.checked ? 'green' : 'red'
    return (
      <TouchableOpacity
        key={index}
        style={{
          backgroundColor,
          flex: 1,
          margin: 2,
          justifyContent: 'center',
          borderRadius: 4,
        }}
        onPress={() => store.checkItem(item)}
      >
        <Text
          style={{
            margin: 3,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'bisque',
            alignSelf: 'center',
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { inputValue, items } = this.state
    return (
      <Subscribe to={[RootStore]}>
        {rootStore => (
          <View style={styles.container}>
            <FlatList
              data={rootStore.state.items}
              keyExtractor={item => item.name}
              renderItem={({ item, index }) =>
                this.listItems(item, index, rootStore)
              }
              numColumns={3}
              contentContainerStyle={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'lightgray',
                backgroundColor: 'white',
              }}
              style={{ padding: 20 }}
            />
          </View>
        )}
      </Subscribe>
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
