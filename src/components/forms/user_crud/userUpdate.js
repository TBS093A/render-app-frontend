import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { userCrudSelector } from '../../../redux/slices/userCrudSlice'
import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import userCrudAsyncThunk from '../../../redux/asyncThunks/userCrudAsyncThunk'

import FormGenerator from '../formGenerator'


const UserUpdateForm = () => {

    const usernameInput = React.createRef()
    const passwordInput = React.createRef()
    const emailInput = React.createRef()

    const dispatch = useDispatch()
    const { info } = useSelector( userCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let refList = [
        usernameInput,
        passwordInput,
        emailInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Create',
            endpint: 'user/crud/update',
            button_value: 'Update User'
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

    const update = async ( refs ) => {
        let pass = {
            user_id: user.id,
            token: token,
            user: {
                username: refs[0].current.value,
                password: refs[1].current.value,
                email: refs[2].current.value,
            }
        }
        dispatch(
            userCrudAsyncThunk.fetchUpdateUser(
                pass
            )
        )
    }

    return (
        <div 
            className="float_form_model"
            style={ { marginTop: '10%'} }
        >
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ update }
            />
            <div className='form_info'>
                { info }
            </div>
        </div>
    )

}

export default UserUpdateForm