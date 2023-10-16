import React, { useReducer } from 'react'
import { View, Text, Pressable, TextInput, Image, FlatList } from 'react-native'
import axios from 'axios'
// import {drinkReducer} from '../../tired/drinkReducer'
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
        console.log(main)
        let ingredientIndex;
        // probably not the best way. maybe split the object
        // for (var i = 1; i <= 15; i++) {
        //     console.log(i)
        //     // if (main.drinks[state.index].strIngredient[i] !== null) {
        //     //     console.log(main.drinks[state.index].strIngredient[i])
        //     // } else {
        //     //     console.log('it is null')
        //     // }
        //     ingredientIndex = i
        //     return ingredientIndex
        // }
        return (
            <View>
                {data !== null && !loading &&
                    <View>
                        {state.index >= 0 &&
                            <View>
                                <Image style={{ height: 150, width: 150 }} source={{ uri: `${main.drinks[state.index].strDrinkThumb}` }} />
                                <Text>Drink: {main.drinks[state.index].strDrink}</Text>
                                <Text>Instructions: {main.drinks[state.index].strInstructions}</Text>
                                <Text>Ingredients: {main.drinks[state.index].strMeasure} of {main.drinks[state.index].strIngredient}</Text>
                                <Text>Type of Glass: {main.drinks[state.index].strGlass}</Text>
                                {state.index === 0 &&
                                    < View >
                                        <Pressable onPress={() => dispatch({ type: 'NEXT_DRINK' })}>
                                            <Text>Next Drink</Text>
                                        </Pressable>
                                    </View>
                                }
                                {/* state.index === 10 on blue */}
                                {state.index === main.drinks.length - 1 &&
                                    <View>

                                        <Pressable onPress={() => dispatch({ type: 'PREV_DRINK' })}>
                                            <Text>Previous Drink</Text>
                                        </Pressable>
                                    </View>
                                }
                                {state.index > 0 && state.index <= main.drinks.length - 1 &&
                                    <View>
                                        <Pressable onPress={() => dispatch({ type: 'NEXT_DRINK' })}>
                                            <Text>Next Drink</Text>
                                        </Pressable>
                                        <Pressable onPress={() => dispatch({ type: 'PREV_DRINK' })}>
                                            <Text>Previous Drink</Text>
                                        </Pressable>
                                    </View>

                                }
                            </View>
                        }

                    </View>
                }
            </View >
        )
    }
    if (data !== null) {

        console.log(data.drinks.length)
    }

    const renderItem = ({ item }) => (
        <View>
            {data === null && !loading &&
                <SearchDrink />
            }
            {data !== null && !loading &&
                <DrinkResults main={item} />
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

                {data !== null && !loading &&
                    <View>
                        <TextInput placeholder='Search for a Drink' onChangeText={setSearch} />
                        <FlatList
                            data={[data]}
                            renderItem={renderItem}
                        />
                        <Pressable onPress={handleSubmit}>
                            <Text>Find Drink</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </View>
    )
}

export default SearchDrinkScreen
