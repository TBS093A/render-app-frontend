import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { renderCrudSelector } from '../../../redux/slices/renderCrudSlice'
import renderCrudAsyncThunk from '../../../redux/asyncThunks/renderCrudAsyncThunk'

import { GeneralAddress } from '../../../redux/asyncThunks/abstracts/abstractAddress'

import FormGenerator from '../formGenerator'


const RenderShowAndDownloadForm = () => {

    const dispatch = useDispatch()
    
    const { render_list } = useSelector( renderCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let blocker = false

    useEffect(
        () => {
            if ( render_list.length === 0 && user.id > 0 && token !== '' && !blocker ) {
                dispatch( renderCrudAsyncThunk.fetchGetAllRenders( token ) )
                if ( render_list.length === 0 ) {
                    blocker = true
                }
            }
        }
    )

    let inputList = [
        {
            type: 'info',
            action: 'Download',
            endpint: 'model/download',
            button_value: 'Refresh Renders List'
        },
        {
            type: 'links-listing',
            name: 'Renders',
            values: render_list,
            link: GeneralAddress + '/render/',
        }
    ]

    const handleRefresh = () => {
        dispatch( renderCrudAsyncThunk.fetchGetAllRenders( token ) )
    }

    return (
        <>
            <FormGenerator 
                inputList={ inputList }
                refList={ [] }
                action={ handleRefresh }
            />
        </>
    )

}

export default RenderShowAndDownloadForm