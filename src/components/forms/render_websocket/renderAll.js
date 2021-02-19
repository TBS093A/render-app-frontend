import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'

import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import AbstractWebsocket from '../abstractWebsocket'


const RenderAllForm = () => {

    const dispatch = useDispatch()

    const choiceListing = React.createRef()
    const resolutionXRange = React.createRef()
    const resolutionYRange = React.createRef()

    const { models_list } = useSelector( modelCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let refList = [
        choiceListing,
        resolutionXRange,
        resolutionYRange,
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Async',
            endpint: 'render/async/all',
            button_value: 'Render All Sets'
        },
        {
            type: 'chice-listing',
            name: 'Models',
            values: models_list,
            ref: choiceListing
        },
        {
            type: 'range',
            name: 'Resolution X',
            min: 600,
            max: 4096,
            step: 10,
            unit: 'px',
            ref: resolutionXRange
        },
        {
            type: 'range',
            name: 'Resolution Y',
            min: 300,
            max: 3112,
            step: 10,
            unit: 'px',
            ref: resolutionYRange
        },
    ]

    useEffect( 
        () => {
            
            if ( models_list.length === 0 && user.id > 0 && token !== '' ) {
                dispatch( modelCrudAsyncThunk.fetchGetAllModels( token ) )
            }
        
        }
    )

    const bodyComparer = ( refs ) => {
        return {
            // fileName: refs[0].current.value,
            fileName: 'testHand',
            resolutionX: refs[1].current.value,
            resolutionY: refs[2].current.value,
        }
    }

    return (
        <>
            <AbstractWebsocket 
                addressWS={ '/all/' }
                inputList={ inputList }
                refList={ refList }
                bodyComparer={ bodyComparer }
            />
        </>
    )
}

export default RenderAllForm