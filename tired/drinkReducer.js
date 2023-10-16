export const drinkReducer = () => {
    switch (state, action) {
        case 'NEXT_PAGE':
            return { index: state.index + 1 }
        case 'PREV_PAGE':
            return { index: state.index - 1 }
    }
}