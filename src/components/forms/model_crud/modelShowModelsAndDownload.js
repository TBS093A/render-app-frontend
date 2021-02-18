import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'
import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import { GeneralAddress } from '../../../redux/asyncThunks/abstracts/abstractAddress'

import FormGenerator from '../formGenerator'


const ModelShowAndDownloadForm = () => {

    const dispatch = useDispatch()
    
    const { models_list } = useSelector( modelCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let blocker = false

    useEffect(
        () => {
            if ( models_list.length === 0 && user.id > 0 && token !== '' && !blocker ) {
                dispatch( modelCrudAsyncThunk.fetchGetAllModels(token) )
                if ( models_list.length === 0 ) {
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
            button_value: 'Refresh Models List'
        },
        {
            type: 'links-listing',
            name: 'Models',
            values: models_list,
            link: GeneralAddress + '/model/',
        }
    ]

    const handleRefresh = () => {
        dispatch( modelCrudAsyncThunk.fetchGetAllModels(token) )
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

export default ModelShowAndDownloadForm