import {screen, render} from '@testing-library/react-native'
import SearchDrinkScreen from '../src/screens/SearchDrinkScreen'
import {expect} from 'jest'
test('This will do something', async () => {
    render(<SearchDrinkScreen />)
    const res = screen.findAllByText('Next Drink')
    console.log(await res)
})