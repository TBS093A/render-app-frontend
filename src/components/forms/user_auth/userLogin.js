import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import userAuthAsyncThunk from '../../../redux/asyncThunks/userAuthAsyncThunk'

import FormGenerator from '../formGenerator'


const UserLoginForm = () => {

    const usernameInput = React.createRef()
    const passwordInput = React.createRef()

    const dispatch = useDispatch()

    let refList = [
        usernameInput,
        passwordInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Create',
            endpint: 'user/auth/login',
            button_value: 'Sign In'
        },
        {
            type: 'text',
            name: 'Username',
            ref: usernameInput
        },
        {
            type: 'password',
            name: 'Password',
            ref: passwordInput
        }
    ]

    const login = async ( refs ) => {
        let pass = {
            username: refs[0].current.value,
            password: refs[1].current.value
        }
        dispatch(
            userAuthAsyncThunk.fetchLogin(
                pass
            )
        )
    }

    return (
        <>
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ login }
            />
        </>
    )

}

export default UserLoginForm