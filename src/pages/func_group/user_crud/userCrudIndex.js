import React, { useState, useEffect } from 'react'

import UserUpdateForm from '../../../components/forms/user_crud/userUpdate'
import UserDeleteForm from '../../../components/forms/user_crud/userDelete'


const __handleSwap = (name, movement) => {

    let display = {
        display: 'block'
    }

    let hide = {
        display: 'none'
    }

    if ( Object.keys(movement['movement']).includes(name) ) {
        if (movement['movement'][name])
            return display
        else
            return hide
    } else {
        return hide
    }

}

const UserCrudIndex = ( movement ) => {


    return (
        <div>
            <div style={ __handleSwap( 'update_user', movement ) }>
                <UserUpdateForm />
            </div>
            <div style={ __handleSwap( 'delete_user', movement ) }>
                <UserDeleteForm />
            </div>
        </div>
    )
}

export default UserCrudIndex