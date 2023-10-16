import React from 'react'
import { View, Text, Pressable, TextInput, FlatList, Image } from 'react-native'
import axios from 'axios'

// https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a
function SearchDrinkByLetter() {
    const [state, dispatch] = React.useReducer(drinkReducer, { index: 0 })
    const [letter, setLetter] = React.useState(null)
    console.log(letter)
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [view, setView] = React.useState('display')
    const options = [
        { key: 'a', value: 'a' },
        { key: 'b', value: 'b' },
        { key: 'c', value: 'c' },
        { key: 'd', value: 'd' },
        { key: 'e', value: 'e' },
        { key: 'f', value: 'f' },
        { key: 'g', value: 'g' },
        { key: 'h', value: 'h' },
        { key: 'i', value: 'i' },
        { key: 'j', value: 'j' },
        { key: 'k', value: 'k' },
        { key: 'l', value: 'l' },
        { key: 'm', value: 'm' },
        { key: 'n', value: 'n' },
        { key: 'o', value: 'o' },
        { key: 'p', value: 'p' },
        { key: 'q', value: 'q' },
        { key: 'r', value: 'r' },
        { key: 's', value: 's' },
        { key: 't', value: 't' },
        { key: 'u', value: 'u' },
        { key: 'v', value: 'v' },
        { key: 'w', value: 'w' },
        { key: 'x', value: 'x' },
        { key: 'y', value: 'y' },
        { key: 'z', value: 'z' },
    ]

    const drinkReducer = () => {
        switch (state, action) {
            case 'NEXT_PAGE':
                return { index: state.index + 1 }
            case 'PREV_PAGE':
                return { index: state.index - 1 }
        }
    }

    const GetDrink = async () => {
        if (loading) {
            try {
                const options = {
                    method: 'GET',
                    url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
                }
                const result = await axios(options)
                console.log(result.data)
                setData(result.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const LetterOptions = ({ main }) => {
        console.log(main)
        return (

            <FlatList
                data={options}
                // although the item itself is unique
                keyExtractor={(item, index) => item.key}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', margin: 5, height: 50, width: 50 }}>
                        <Pressable onPress={() => { setLetter(item.value); setLoading(true); setView('display') }}>

                            <Text>{item.value}</Text>
                        </Pressable>
                    </View>
                )}
            />
        )
    }

    const DisplayDrinks = ({ main }) => {
        return (
            <View>
                <Image style={{ width: 50, height: 50 }} source={{ uri: `${data.drinks[state.index].strDrinkThumb}` }} />
                <Text>Instructions: {data.drinks[state.index].strInstructions}</Text>
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <View>
            {data !== null && !loading &&
                <DisplayDrinks main={item} />
            }
        </View>
    )

    const handleSubmit = () => {
        setLoading(true)
    }

    React.useEffect(() => {
        GetDrink()
    }, [loading, letter])

    return (
        <View>
            {data === null && !loading &&
                <LetterOptions />
            }
            {data !== null && !loading &&
                <View>
                    <DisplayDrinks />
                    {/* <FlatList
                        data={data}
                        renderItem={renderItem}
                    /> */}
                </View>
            }

            <Text></Text>
        </View>
    )
}

export default SearchDrinkByLetter
