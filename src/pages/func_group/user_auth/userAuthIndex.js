import React, { useState, useEffect } from 'react'

import UserLoginForm from '../../../components/forms/user_auth/userLogin'
import UserRegisterForm from '../../../components/forms/user_auth/userRegister'


const UserAuthIndex = () => {

    const [swapForm, setSwapForm] = useState(true)

    const handleSwap = (event) => {
        event.preventDefault()
        setSwapForm(
            !swapForm
        )
    }

    return (
        <div>
            {   swapForm
                ? <UserLoginForm />
                : <UserRegisterForm />
            }
            <button onClick={ (event) => handleSwap(event) }>
                {
                    swapForm
                    ? 'Sign Up'
                    : 'Sign In'
                }
            </button>
        </div>
    )
}

export default UserAuthIndex