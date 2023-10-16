import React from 'react'
import { View, Text, Pressable } from 'react-native'

function Home({ navigation }) {
    return (
        <View>
            <Pressable onPress={() => navigation.navigate({ name: `SearchDrinkScreen` })}>
                <Text>Search for a Driink</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate({ name: `SearchDrinkByLetter` })}>
                <Text>Search for a Driink By Letter</Text>
            </Pressable>
        </View>
    )
}

export default Home
