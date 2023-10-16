import React from 'react'
import { View, Text, Pressable } from 'react-native'

function Home({ navigation }) {
    return (
        <View>
            <Pressable onPress={() => navigation.navigate({ name: `SearchDrinkScreen` })}>
                <Text>Search for a Driink</Text>
            </Pressable>
        </View>
    )
}

export default Home
