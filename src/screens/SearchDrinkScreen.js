import React, { useReducer } from 'react'
import { View, Text, Pressable, TextInput, Image } from 'react-native'
import axios from 'axios'


function SearchDrinkScreen() {
    const drinkReducer = (state, action) => {
        switch (action.type) {
            case 'NEXT_DRINK':
                return { index: state.index + 1 }
            case 'PREV_DRINK':
                return { index: state.index - 1 }
        }

    }
    const [search, setSearch] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState(null)
    const [state, dispatch] = useReducer(drinkReducer, { index: 0 })
    const GetDrink = async () => {
        if (loading) {
            try {
                const options = {
                    method: 'GET',
                    url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`,

                }
                const response = await axios(options)
                console.log(response.data)
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    React.useEffect(() => {
        GetDrink()
    }, [loading])

    const handleSubmit = () => {
        setLoading(true)
    }
    return (
        <View>
            {!loading && data === null &&
                <View>
                    <Text>Hello Search Drink Screen</Text>
                    <TextInput placeholder='Search for a Drink' onChangeText={setSearch} />
                    <Pressable onPress={handleSubmit}>
                        <Text>Find Drink</Text>
                    </Pressable>
                </View>
            }
            {!loading && data !== null &&
                <View>
                    {state.index >= 0 &&
                        <View>
                            <Image style={{ height: 150, width: 150 }} source={{ uri: `${data.drinks[state.index].strDrinkThumb}` }} />
                            <Text>{data.drinks[state.index].strDrink}</Text>
                            <Pressable onPress={() => dispatch({ type: 'NEXT_DRINK' })}>
                                <Text>Next Drink</Text>
                            </Pressable>
                            <Pressable onPress={() => dispatch({ type: 'PREVIOUS_DRINK' })}>
                                <Text>Previous Drink</Text>
                            </Pressable>
                        </View>
                    }
                    {/* {state.index < something.length} */}
                </View>
            }
            {loading &&
                <Text>Loading... Please wait...</Text>
            }
        </View>
    )
}

export default SearchDrinkScreen
