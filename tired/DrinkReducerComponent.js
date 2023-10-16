import React from 'react'
import { View, Text } from 'react-native'
const DrinkReducerComponent = () => {
    const [state, dispatch] = React.useReducer(drinkReducer, { index: 0 })
    const drinkReducer = () => {
        switch (state, action) {
            case 'NEXT_PAGE':
                return { index: state.index + 1 }
            case 'PREV_PAGE':
                return { index: state.index - 1 }
        }
    }
    return (
        <View>
            <Pressable onPress={() => dispatch({ type: 'NEXT_PAGE' })}>
                <Text>Next</Text>
            </Pressable>
            <Pressable onPress={() => dispatch({ type: 'PREV_PAGE' })}>
                <Text>Previous</Text>
            </Pressable>
        </View>
    )
}
export default DrinkReducerComponent