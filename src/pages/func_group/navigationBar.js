import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../redux/slices/userAuthSlice'
import { userCrudSelector } from '../../redux/slices/userCrudSlice'

import userCrudAsyncThunk from '../../redux/asyncThunks/userCrudAsyncThunk'


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
        if ( user_get !== {} && token !== '' && user.id > 0)
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
                                    │   │   ├── { user_get.username } 
                                </div>
                                <div>
                                    │   │   └── { user_get.email }
                                </div>
                            </div>
                        </div>
                        <div onClick={ () => movements.user_view.setUserCrudView( 
                                {
                                    update_user: true,
                                    delete_user: false
                                }
                            )
                        }>
                            │   ├── Update User
                        </div>
                        <div onClick={ () => movements.user_view.setUserCrudView( 
                                {
                                    update_user: false,
                                    delete_user: true
                                }
                            )
                        }>
                            │   └── Delete User
                        </div>
                    </div>
                </div>
                <div>
                    <div onClick={ () => setShowModels( !showModels ) }>
                    ├── Models
                    </div>
                    <div style={ __styleChanger( showModels ) }>
                        <div onClick={ () => movements.model_view.setModelCrudView( 
                                {
                                    get_all_models: true,
                                    get_one_model_and_download: false,
                                    upload_model: false
                                }
                            )
                        }>
                            │   ├── Get All Models
                        </div>
                        <div onClick={ () => movements.model_view.setModelCrudView( 
                                {
                                    get_all_models: false,
                                    get_one_model_and_download: true,
                                    upload_model: false
                                }
                            )
                        }>
                            │   ├── Get One Model & Download
                        </div>
                        <div onClick={ () => movements.model_view.setModelCrudView( 
                                {
                                    get_all_models: false,
                                    get_one_model_and_download: false,
                                    upload_model: true
                                }
                            )
                        }>
                            │   └── Upload Model
                        </div>
                    </div>
                </div>
                <div>
                    <div onClick={ () => setShowRender( !showRender ) }>
                    ├── Render
                    </div>
                    <div style={ __styleChanger( showRender ) }>
                        <div onClick={ () => movements.model_view.setModelCrudView( 
                                {
                                    show_ready_renders_and_download: true,
                                    render_functionality: {
                                        render_single_image: false,
                                        render_single_set: false,
                                        render_all: false,
                                        render_image_by_vector: false,
                                        render_set_by_vector: false
                                    }
                                }
                            )
                        }>
                            │   ├── Show Ready Renders & Download
                        </div>
                        <div>
                            <div onClick={ () => setShowRenderFunc( !showRenderFunc ) }>
                            │   ├── Render Functionality
                            </div>
                            <div style={ __styleChanger( showRenderFunc ) }>
                                <div onClick={ () => movements.model_view.setModelCrudView( 
                                        {
                                            show_ready_renders_and_download: false,
                                            render_functionality: {
                                                render_single_image: true,
                                                render_single_set: false,
                                                render_all: false,
                                                render_image_by_vector: false,
                                                render_set_by_vector: false
                                            }
                                        }
                                    )
                                }>
                                    │   │   ├── Render Single Image
                                </div>
                                <div onClick={ () => movements.model_view.setModelCrudView( 
                                        {
                                            show_ready_renders_and_download: false,
                                            render_functionality: {
                                                render_single_image: false,
                                                render_single_set: true,
                                                render_all: false,
                                                render_image_by_vector: false,
                                                render_set_by_vector: false
                                            }
                                        }
                                    )
                                }>
                                    │   │   ├── Render Single Set
                                </div>
                                <div onClick={ () => movements.model_view.setModelCrudView( 
                                        {
                                            show_ready_renders_and_download: false,
                                            render_functionality: {
                                                render_single_image: false,
                                                render_single_set: false,
                                                render_all: true,
                                                render_image_by_vector: false,
                                                render_set_by_vector: false
                                            }
                                        }
                                    )
                                }>
                                    │   │   ├── Render All Sets
                                </div>
                                <div onClick={ () => movements.model_view.setModelCrudView( 
                                        {
                                            show_ready_renders_and_download: false,
                                            render_functionality: {
                                                render_single_image: false,
                                                render_single_set: false,
                                                render_all: false,
                                                render_image_by_vector: true,
                                                render_set_by_vector: false
                                            }
                                        }
                                    )
                                }>
                                    │   │   ├── Render Image By Vector
                                </div>
                                <div onClick={ () => movements.model_view.setModelCrudView( 
                                        {
                                            show_ready_renders_and_download: false,
                                            render_functionality: {
                                                render_single_image: false,
                                                render_single_set: false,
                                                render_all: false,
                                                render_image_by_vector: false,
                                                render_set_by_vector: true
                                            }
                                        }
                                    )
                                }>
                                    │   │   └── Render Set By Vector
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    └── Logout
                </div>
            </div>
        </>
    )
}

export default NavigationBar