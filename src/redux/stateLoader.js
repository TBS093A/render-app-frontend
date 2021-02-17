export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')

        if (serializedState === undefined || serializedState === null) {
            return {}
        } else {
            return JSON.parse(serializedState)
        }


    } catch (err) {
        console.log(err)
        return undefined
    }
};

export const saveState = (state) => {
    try {

        const serializedState = JSON.stringify(state)

        if (serializedState === null) {
            return undefined
        } else {
            localStorage.setItem('state', serializedState)

        }
    } catch (err) {
        console.log('save in local storage error')
    }
};