import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userAuthSelector } from '../../redux/slices/userAuthSlice'

import UserAuthIndex from './user_auth/userAuthIndex'
import UserCrudIndex from './user_crud/userCrudIndex'
import ModelCrudIndex from './model_crud/modelCrudIndex'
import RenderCrudIndex from './render_crud/renderCrudIndex'
import RenderWebsocketIndex from './render_websocket/renderWebsocketIndex'


const GeneralView = () => {

    const [userAuthView, setUserAuthView] = useState(true)
    const [userCrudView, setUserCrudView] = useState(false)
    const [modelCrudView, setModelCrudView] = useState(false)
    const [renderCrudView, setRenderCrudView] = useState(false)
    const [renderWebsocketView, setRenderWebsocketView] = useState(false)

    return (
        <>
            <UserAuthIndex />
            <UserCrudIndex />
            <ModelCrudIndex />
            <RenderCrudIndex />
            <RenderWebsocketIndex />
        </>
    )
}

const __verifyUserSession = (token, user)  => {
    
    if ( user.id > 0 && user.username !== '' && user.email !== '' && token !== '')
        return false
    else
        return true
    
}

const VerifyUserSession = () => {
    
    const { token, user } = useSelector(userAuthSelector)

    return (
        <>
            {
                __verifyUserSession(token, user) 
                ? <GeneralView />
                : <UserAuthIndex />  
            }
        </>
    )
}

export default VerifyUserSession