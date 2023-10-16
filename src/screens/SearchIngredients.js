import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import axios from 'axios'

function SearchIngredients() {

    const [data, setData] = React.useState(null);
    const [ingredient, setIngredient] = React.useState(null);
    const [loading, setLoading] = React.useState(false)
    const GetIngredient = async () => {
        if (loading) {
            try {
                const options = {
                    method: 'GET',
                    url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`
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

    const SearchByIngredient = () => {
        return (
            <View>
                {data !== null &&
                    <View>
                        <Pressable onPress={handleSubmit}>
                            <Text>Search</Text>
                        </Pressable>
                    </View>
                }
            </View>
        )
    }

    const handleSubmit = () => {
        setLoading(true)
    }

    React.useEffect(() => {
        GetIngredient()
    }, [loading])

    // www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
    return (
        <View>

            <TextInput placeholder='Enter an Ingredient' onChangeText={setIngredient} />
            
            <Pressable onPress={handleSubmit}>
                <Text>Search</Text>
            </Pressable>
            {data !== null && !loading &&
                <Text>Text from a non redundant reducer function</Text>
            }
        </View>
    )
}

export default SearchIngredients