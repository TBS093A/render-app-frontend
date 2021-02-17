export const loadState = () => {
    try {
        const stateName = localStorage.getItem('user_key')
        const serializedState = localStorage.getItem(stateName)

        if (stateName === null) {
            return {}
        } else if (serializedState === null) {
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

        const stateName = localStorage.getItem('user_key')
        const serializedState = JSON.stringify(state)

        if (stateName === null) {
            return undefined
        } else if (serializedState === null) {
            return undefined
        } else {
            localStorage.setItem(stateName, serializedState)

        }
    } catch (err) {
        console.log('save in local storage error')
    }
};