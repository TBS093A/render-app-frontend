import React, { useState, useEffect } from 'react'

import VerifyUserSession from './rootUtils'

import UserAuthIndex from './user_auth/userAuthIndex'
import UserCrudIndex from './user_crud/userCrudIndex'
import ModelCrudIndex from './model_crud/modelCrudIndex'
import RenderCrudIndex from './render_crud/renderCrudIndex'
import RenderWebsocketIndex from './render_websocket/renderWebsocketIndex'


const Root = () => {

    return (
        <div>
            <VerifyUserSession />
        </div>
    )
}

export default Root