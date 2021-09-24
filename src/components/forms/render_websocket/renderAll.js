import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'

import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import AbstractWebsocket from '../abstractWebsocket'


const RenderAllForm = () => {

    const dispatch = useDispatch()

    const choiceListing = React.createRef()
    const rotateRange = React.createRef()
    const resolutionXRange = React.createRef()
    const resolutionYRange = React.createRef()


    const { models_list } = useSelector( modelCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let refList = [
        choiceListing,
        rotateRange,
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
            type: 'choice-listing',
            name: 'Models',
            values: models_list,
            ref: choiceListing
        },
        {
            type: 'range',
            name: 'Rotate',
            min: 1,
            max: 360,
            step: 1,
            unit: 'deg',
            ref: rotateRange
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
            fileName: refs[0].current.value.replace('.blend', ''),
            // fileName: 'testHand',
            angle: refs[1].current.value / 62, // on backend 0.1 - 6.2 value
            resolutionX: refs[2].current.value,
            resolutionY: refs[3].current.value,
        }
    }

    return (
        <div>
            <AbstractWebsocket 
                addressWS={ '/all/' }
                inputList={ inputList }
                refList={ refList }
                bodyComparer={ bodyComparer }
            />
        </div>
    )
}

export default RenderAllForm