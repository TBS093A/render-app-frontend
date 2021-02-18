import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../redux/slices/userAuthSlice'
import { userCrudSelector } from '../../redux/slices/userCrudSlice'

import userCrudAsyncThunk from '../../redux/asyncThunks/userCrudAsyncThunk'
import userAuthAsyncThunk from '../../redux/asyncThunks/userAuthAsyncThunk'


const __setShowGeneral = ( view, key, movements ) => {

    let user_default = {
        update_user: false,
        delete_user: false
    }

    let model_default = {
        show_models_and_dwonload: false,
        upload_model: false
    }

    let render_default = {
        show_ready_renders_and_download: false,
        render_functionality: {
            render_single_image: false,
            render_single_set: false,
            render_all: false,
            render_image_by_vector: false,
            render_set_by_vector: false
        }
    }

    if (view === 'user_view') {
        let new_move = movements.user_view.userCrudView
        new_move[key] = true
        movements.user_view.setUserCrudView( 
            new_move
        )
        movements.model_view.setModelCrudView(
            model_default
        )
        movements.render_view.setRenderView(
            render_default
        )
    } else if (view === 'model_view') {
        
        let new_move = movements.model_view.modelCrudView
        new_move[key] = true
        movements.model_view.setModelCrudView( 
            new_move
        )
        movements.user_view.setUserCrudView( 
            user_default
        )
        movements.render_view.setRenderView(
            render_default
        )
    } else if (view === 'render_view') {
        let new_move = movements.render_view.renderView
        if ( key in new_move ) {
            new_move[key] = true
            movements.render_view.setRenderView( 
                new_move
            )
        } else {
            new_move['render_functionality'][key] = true
            movements.render_view.setRenderView( 
                new_move
            )
        }
        movements.model_view.setModelCrudView( 
            model_default
        )
        movements.user_view.setUserCrudView( 
            user_default
        )
    }
    
}

const __styleChanger = ( bool ) => {
    
    let display = {
        display: 'block'
    }

    let hide = {
        display: 'none'
    }
    
    return bool ? display : hide
}

const NavigationBar = ({ movements }) => {

    const { user_get } = useSelector(userCrudSelector)
    const { token, user } = useSelector(userAuthSelector)

    const dispatch = useDispatch()

    useEffect( () => {
        if ( Object.keys(user_get).length === 0 && token !== '' && user.id > 0)
            dispatch(
                userCrudAsyncThunk.fetchGetOneUser(
                    {
                        user_id: user.id,
                        token: token
                    }
                )
            )
    })

    const [showAccount, setShowAccount] = useState(false)
    const [showModels, setShowModels] = useState(false)
    const [showRender, setShowRender] = useState(false)
    const [showRenderFunc, setShowRenderFunc] = useState(false)
    
    const logout = async () => {
        dispatch(
            userAuthAsyncThunk.fetchLogout(
                token
            )
        )
    }

    return(
        <>
            <div>
                Menu
                <div>
                    <div onClick={ () => setShowAccount( !showAccount ) }>
                    ├── Account Settings
                    </div>
                    <div style={ __styleChanger( showAccount) }>
                        <div>
                            │   ├── User info
                            <div>
                                <div>
                                    │   │   ├── Username: { user_get.username } 
                                </div>
                                <div>
                                    │   │   └── E-mail: { user_get.email }
                                </div>
                            </div>
                        </div>
                        <div onClick={ () => __setShowGeneral( 'user_view', 'update_user', movements ) }>
                            │   ├── Update User
                        </div>
                        <div onClick={ () => __setShowGeneral( 'user_view', 'delete_user', movements ) }>
                            │   └── Delete User
                        </div>
                    </div>
                </div>
                <div>
                    <div onClick={ () => setShowModels( !showModels ) }>
                    ├── Models
                    </div>
                    <div style={ __styleChanger( showModels ) }>
                        <div onClick={ () => __setShowGeneral( 'model_view', 'show_models_and_download', movements )}>
                            │   ├── Show Models & Download
                        </div>
                        <div onClick={ () => __setShowGeneral( 'model_view', 'upload_model', movements ) }>
                            │   └── Upload Model
                        </div>
                    </div>
                </div>
                <div>
                    <div onClick={ () => setShowRender( !showRender ) }>
                    ├── Render
                    </div>
                    <div style={ __styleChanger( showRender ) }>
                        <div onClick={ () => __setShowGeneral( 'render_view', 'show_ready_renders_and_download', movements ) }>
                            │   ├── Show Ready Renders & Download
                        </div>
                        <div>
                            <div onClick={ () => setShowRenderFunc( !showRenderFunc ) }>
                            │   ├── Render Functionality
                            </div>
                            <div style={ __styleChanger( showRenderFunc ) }>
                                <div onClick={ () => __setShowGeneral( 'render_view', 'render_single_image', movements ) }>
                                    │   │   ├── Render Single Image
                                </div>
                                <div onClick={ () => __setShowGeneral( 'render_view', 'render_single_set', movements ) }>
                                    │   │   ├── Render Single Set
                                </div>
                                <div onClick={ () => __setShowGeneral( 'render_view', 'render_all', movements ) }>
                                    │   │   ├── Render All Sets
                                </div>
                                <div onClick={ () => __setShowGeneral( 'render_view', 'render_image_by_vector', movements ) }>
                                    │   │   ├── Render Image By Vector
                                </div>
                                <div onClick={ () => __setShowGeneral( 'render_view', 'render_set_by_vector', movements ) }>
                                    │   │   └── Render Set By Vector
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={ () => logout() }>
                    └── Sign Out
                </div>
            </div>
        </>
    )
}

export default NavigationBar