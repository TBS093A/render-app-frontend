import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { userCrudSelector } from '../../../redux/slices/userCrudSlice'
import userCrudAsyncThunk from '../../../redux/asyncThunks/userCrudAsyncThunk'

import FormGenerator from '../formGenerator'


const UserRegisterForm = () => {

    const usernameInput = React.createRef()
    const passwordInput = React.createRef()
    const emailInput = React.createRef()

    const dispatch = useDispatch()
    const { info } = useSelector( userCrudSelector )

    let refList = [
        usernameInput,
        passwordInput,
        emailInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Create',
            endpint: 'user/auth/login',
            button_value: 'Sign Up'
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
        },
        {
            type: 'text',
            name: 'Email',
            ref: emailInput
        }
    ]

    const register = async ( refs ) => {
        let pass = {
            username: refs[0].current.value,
            password: refs[1].current.value,
            email: refs[2].current.value,
        }
        dispatch(
            userCrudAsyncThunk.fetchRegister(
                pass
            )
        )
    }

    return (
        <div>
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ register }
            />
            <div className='form_info'>
                { info }
            </div>
        </div>
    )

}

export default UserRegisterForm