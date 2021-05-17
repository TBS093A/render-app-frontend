import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { userAuthSelector } from '../../redux/slices/userAuthSlice'

import UserAuthIndex from './user_auth/userAuthIndex'
import UserCrudIndex from './user_crud/userCrudIndex'
import ModelCrudIndex from './model_crud/modelCrudIndex'
import RenderIndex from './render/renderIndex'

import NavigationBar from './navigationBar'
import CanvasBackgroundAnimation from './canvasBackgroundAnimation'


const GeneralView = () => {

    const [userCrudView, setUserCrudView] = useState(
        {
            update_user: false,
            delete_user: false
        }
    )
    const [modelCrudView, setModelCrudView] = useState(
        {
            show_models_and_download: false,
            upload_model: false
        }
    )
    const [renderCrudView, setRenderCrudView] = useState(
        {
            show_ready_renders_and_download: false,
            render_functionality: {
                render_single_image: false,
                render_single_set: false,
                render_all: false,
                render_image_by_vector: false,
                render_set_by_vector: false
            }
        }
    )

    let movements = {
        user_view: {
            userCrudView: userCrudView,
            setUserCrudView: setUserCrudView
        },
        model_view: {
            modelCrudView: modelCrudView,
            setModelCrudView: setModelCrudView
        },
        render_view: {
            renderView: renderCrudView, 
            setRenderView: setRenderCrudView
        }
    }

    return (
        <div>
            <NavigationBar 
                movements={ movements }
            />
            <UserCrudIndex 
                movement={ movements.user_view.userCrudView }
            />
            <ModelCrudIndex 
                movement={ movements.model_view.modelCrudView }
            />
            <RenderIndex 
                movement={ movements.render_view.renderView }
            />
        </div>
    )
}


const VerifyUserSession = () => {
    
    const { token, user } = useSelector(userAuthSelector)

    const [showGeneral, setShowGeneral] = useState(false)

    useEffect(
        () => {
            if ( user.id > 0 && token !== '' && showGeneral === false ) {
                setShowGeneral(true)
            } else if ( user.id <= 0 && token === '' && showGeneral === true ) {
                setShowGeneral(false)
            }
        }
    )

    return (
        <div>
            {
                showGeneral
                ? <GeneralView />  
                : <UserAuthIndex />
            }
            <CanvasBackgroundAnimation />
        </div>
    )
}

export default VerifyUserSession