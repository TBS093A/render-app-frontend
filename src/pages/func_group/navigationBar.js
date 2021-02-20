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
        let new_move = user_default
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
        
        let new_move = model_default
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
        let new_move = render_default
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

    const [clickHide, setClickHide] = useState(true)
    
    const logout = async () => {
        dispatch(
            userAuthAsyncThunk.fetchLogout(
                token
            )
        )
    }

    return(
        <div 
            className="navigation_bar"
            style={ clickHide ? { marginRight: '-350px' } : { marginRight: '0px' } }
        >
            <div 
                onClick={ () => setClickHide( !clickHide ) }
                className="nav_bar_clickable"
            >
            </div> 
            <div className="nav_bar_general">
                Menu
                <div>
                    <div 
                        onClick={ () => setShowAccount( !showAccount ) }
                        className='nav_bar_header'
                    >
                        <pre>  ├── </pre> <p> Account Settings </p>
                    </div>
                    <div style={ __styleChanger( showAccount) }>
                        <div>
                            <div className='nav_bar_option'>
                                <pre>  │   ├── </pre> <p> User info </p>
                            </div>
                            <div>
                                <div className='nav_bar_option'>
                                    <pre>  │   │   ├── </pre> <p>Username: { user_get.username } </p>
                                </div>
                                <div className='nav_bar_option'>
                                    <pre>  │   │   └── </pre> <p> E-mail: { user_get.email } </p>
                                </div>
                            </div>
                        </div>
                        <div 
                            onClick={ () => __setShowGeneral( 'user_view', 'update_user', movements ) } 
                            className='nav_bar_option'
                        >
                            <pre>  │   ├── </pre> <p> Update User </p>
                        </div>
                        <div 
                            onClick={ () => __setShowGeneral( 'user_view', 'delete_user', movements ) } 
                            className='nav_bar_option'
                        >
                            <pre>  │   └── </pre> <p> Delete User </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div 
                        onClick={ () => setShowModels( !showModels ) }
                        className='nav_bar_header'
                    >
                        <pre>  ├── </pre><p>Models</p>
                    </div>
                    <div style={ __styleChanger( showModels ) } className='nav_bar_option'>
                        <div 
                            onClick={ () => __setShowGeneral( 'model_view', 'show_models_and_download', movements )}
                            className='nav_bar_option'
                        >
                            <pre>  │   ├── </pre> <p> Show Models & Download</p>
                        </div>
                        <div 
                            onClick={ () => __setShowGeneral( 'model_view', 'upload_model', movements ) }
                            className='nav_bar_option'
                        >
                            <pre>  │   └── </pre> <p> Upload Model</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div 
                        onClick={ () => setShowRender( !showRender ) } 
                        className='nav_bar_header'
                    >
                        <pre>  ├── </pre> <p> Render </p>
                    </div>
                    <div style={ __styleChanger( showRender ) }>
                        <div>
                            <div 
                                onClick={ () => setShowRenderFunc( !showRenderFunc ) } 
                                className='nav_bar_option'
                            >
                                <pre>  │   ├── </pre> <p> Render Functionality </p>
                            </div>
                            <div style={ __styleChanger( showRenderFunc ) }>
                                <div 
                                    onClick={ () => __setShowGeneral( 'render_view', 'render_single_image', movements ) } 
                                    className='nav_bar_option'
                                >
                                    <pre>  │   │   ├── </pre> <p> Render Single Image </p>
                                </div>
                                <div 
                                    onClick={ () => __setShowGeneral( 'render_view', 'render_single_set', movements ) } 
                                    className='nav_bar_option'
                                >
                                    <pre>  │   │   ├── </pre> <p> Render Single Set</p>
                                </div>
                                <div 
                                    onClick={ () => __setShowGeneral( 'render_view', 'render_all', movements ) } 
                                    className='nav_bar_option'
                                >
                                    <pre>  │   │   ├── </pre> <p> Render All Sets</p>
                                </div>
                                <div 
                                    onClick={ () => __setShowGeneral( 'render_view', 'render_image_by_vector', movements ) } 
                                    className='nav_bar_option'
                                >
                                    <pre>  │   │   ├── </pre> <p> Render Image By Vector</p>
                                </div>
                                <div 
                                    onClick={ () => __setShowGeneral( 'render_view', 'render_set_by_vector', movements ) } 
                                    className='nav_bar_option'
                                >
                                    <pre>  │   │   └── </pre> <p> Render Set By Vector</p>
                                </div>
                            </div>
                        </div>
                        <div 
                            onClick={ () => __setShowGeneral( 'render_view', 'show_ready_renders_and_download', movements ) } 
                            className='nav_bar_option'
                        >
                            <pre>  │   └── </pre> <p> Show Ready Renders & Download </p>
                        </div>
                    </div>
                </div>
                <div onClick={ () => logout() } className='nav_bar_header'>
                    <pre>  └── </pre><p> Sign Out</p>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar