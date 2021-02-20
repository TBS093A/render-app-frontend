import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { userCrudSelector } from '../../../redux/slices/userCrudSlice'

import { deleteUser } from '../../../redux/slices/userAuthSlice'

import userCrudAsyncThunk from '../../../redux/asyncThunks/userCrudAsyncThunk'

import FormGenerator from '../formGenerator'


const UserDeleteForm = () => {

    const usernameInput = React.createRef()

    const { user, token } = useSelector( userAuthSelector )

    const dispatch = useDispatch()
    const { info } = useSelector( userCrudSelector )

    let refList = [
        usernameInput,
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Create',
            endpint: 'user/crud/delete',
            button_value: 'Delete'
        },
        {
            type: 'text',
            name: 'Username',
            ref: usernameInput
        }
    ]

    const handleDelete = async ( refs ) => {
        if ( refs[0].current.value === user.username ) {
            let pass = {
                token: token,
                user_id: user.id
            }
            dispatch(
                deleteUser()
            )
            dispatch(
                userCrudAsyncThunk.fetchDeleteUser(
                    pass
                )
            )
        }
    }

    return (
        <div 
            className="float_form_model"
            style={ { marginTop: '17%'} }
        >
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ handleDelete }
            />
            <div className='form_info'>
                { info }
            </div>
        </div>
    )

}

export default UserDeleteForm