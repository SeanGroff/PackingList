import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Container, Provider } from 'unstated'
import Icon from 'react-native-vector-icons/FontAwesome'

import PackingListScreen from '../screens/PackingListScreen'
import InputScreen from '../screens/InputScreen'

const RootStack = createBottomTabNavigator(
  {
    Home: PackingListScreen,
    Input: InputScreen,
  },
  {
    // Will actually default to first object property above (Home)
    initialRouteName: 'Home',
    navigationOptions: () => ({
      // import an icons npm package instead (react native vector icons)
      tabBarIcon: ({ focused }) => (
        <Icon
          name="hand-lizard-o"
          size={25}
          color={focused ? 'orange' : 'gray'}
        />
      ),
    }),
  }
)

// Probably move this to a new file :)
export class RootStore extends Container {
  // initial state shape with dummy items
  state = {
    items: [
      { name: 'Taco' },
      { name: 'Burrito' },
      { name: 'Queso' },
      { name: 'Jalepeno' },
    ],
    inputValue: '',
  }

  handleInput = value => {
    this.setState({ inputValue: value })
  }

  addItem = () => {
    const { items, inputValue } = this.state
    const newItems = [...items, { name: inputValue, checked: false }]

    this.setState({ items: newItems, inputValue: null })
  }

  clearItems = () => {
    this.setState({ items: [], inputValue: '' })
  }

  checkItem = selectedItem => {
    const selectedName = selectedItem.name
    const newItems = this.state.items.map(item => {
      const { name, checked } = item
      return name === selectedName ? { name, checked: !checked } : item
    })

    this.setState({ items: newItems })
  }
}

export default class RootComponent extends Component {
  render() {
    // because not in a new file :(
    const rootStore = new RootStore()
    return (
      <Provider inject={[rootStore]}>
        <RootStack />
      </Provider>
    )
  }
}
