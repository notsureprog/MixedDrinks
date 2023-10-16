import React, { useReducer } from 'react'
import { View, Text, Pressable, TextInput, Image, FlatList } from 'react-native'
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
    const [view, setView] = React.useState('search')
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
    // For future... Very handy but need a little syntax refresher (rendering two or more components in flatlists that is)
    const SearchDrink = ({ main }) => {
        return (

            <View>
                <Text>Hello Search Drink Screen</Text>
                <TextInput placeholder='Search for a Drink' onChangeText={setSearch} />
                <Pressable onPress={handleSubmit}>
                    <Text>Find Drink</Text>
                </Pressable>
            </View>
        )
    }

    const DrinkResults = ({ main }) => {
        // let ingredientList;
        // for (var i = 0; i < data.length; i++) {

        // }
    }

    const renderItem = ({ item }) => (
        <View>
            {data === null && !loading && view === 'search' &&
                <SearchDrink />
            }
            {data !== null && !loading && view === 'display' &&
                <DrinkResults />
            }
        </View>

    )

    React.useEffect(() => {
        GetDrink()
    }, [loading, view])

    const handleSubmit = () => {
        setLoading(true)

    }
    return (
        <View>
            {data !== null && !loading &&
                <View>
                    {state.index >= 0 &&
                        <View>
                            <Image style={{ height: 150, width: 150 }} source={{ uri: `${data.drinks[state.index].strDrinkThumb}` }} />
                            <Text>{data.drinks[state.index].strDrink}</Text>
                            <Text>Instructions: {data.drinks[state.index].strInstructions}</Text>
                            <Text>Ingredients: {data.drinks[state.index].strMeasure} of {data.drinks[state.index].strIngredient}</Text>
                            <Pressable onPress={() => dispatch({ type: 'NEXT_DRINK' })}>
                                <Text>Next Drink</Text>
                            </Pressable>
                            <Pressable onPress={() => dispatch({ type: 'PREVIOUS_DRINK' })}>
                                <Text>Previous Drink</Text>
                            </Pressable>
                        </View>
                    }
                    {state.index < data.length &&
                        <View>
                            <Image style={{ height: 150, width: 150 }} source={{ uri: `${data.drinks[state.index].strDrinkThumb}` }} />
                            <Text>{data.drinks[state.index].strDrink}</Text>
                            <Pressable onPress={() => dispatch({ type: 'PREVIOUS_DRINK' })}>
                                <Text>Previous Drink</Text>
                            </Pressable>
                        </View>
                    }
                </View>
            }
            {data === null && !loading &&
                <View>
                    <Text>Hello Search Drink Screen</Text>
                    <TextInput placeholder='Search for a Drink' onChangeText={setSearch} />
                    <Pressable onPress={handleSubmit}>
                        <Text>Find Drink</Text>
                    </Pressable>
                </View>
            }
            <View>

                {data !== null && !loading && view === 'display' &&
                    <View>

                    </View>
                }
            </View>
        </View>
    )
}

export default SearchDrinkScreen
