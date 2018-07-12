import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Subscribe } from 'unstated'

import { RootStore } from '../app/RootComponent'
import ListInput from '../components/ListInput'

export default class InputScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Item to Pack',
    }
  }
  render() {
    return (
      <Subscribe to={[RootStore]}>
        {rootStore => (
          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <View style={{ flex: 1, backgroundColor: 'magenta' }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'red',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Recently Added</Text>
                <Text onPress={rootStore.clearItems}>Clear Items</Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                {rootStore.state.items.map((item, index) => (
                  <Text key={index}>{item.name}</Text>
                ))}
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'indigo' }}>
              <ListInput
                addNewItem={rootStore.addItem}
                clearItems={rootStore.clearItems}
                onChangeText={val => rootStore.handleInput(val)}
                style={{}}
              />
            </View>
          </View>
        )}
      </Subscribe>
    )
  }
}
