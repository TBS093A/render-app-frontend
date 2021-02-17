import React, { useState, useEffect } from 'react'

import UserAuthIndex from './user_auth/userAuthIndex'
import UserCrudIndex from './user_crud/userCrudIndex'
import ModelCrudIndex from './model_crud/modelCrudIndex'
import RenderCrudIndex from './render_crud/renderCrudIndex'
import RenderWebsocketIndex from './render_websocket/renderWebsocketIndex'

const Root = () => {

    const [userAuthView, setUserAuthView] = useState(true)
    const [userCrudView, setUserCrudView] = useState(false)
    const [modelCrudView, setModelCrudView] = useState(false)
    const [renderCrudView, setRenderCrudView] = useState(false)
    const [renderWebsocketView, setRenderWebsocketView] = useState(false)

    return (
        <div>
        </div>
    )
}

export default Root