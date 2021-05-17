import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'

import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import AbstractWebsocket from '../abstractWebsocket'


const RenderSingleImageForm = () => {

    const dispatch = useDispatch()

    const choiceListing = React.createRef()
    const setIdRange = React.createRef()
    const rotateRange = React.createRef()
    const cameraIdRange = React.createRef()
    const resolutionXRange = React.createRef()
    const resolutionYRange = React.createRef()

    const { models_list } = useSelector( modelCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let refList = [
        choiceListing,
        setIdRange,
        rotateRange,
        cameraIdRange,
        resolutionXRange,
        resolutionYRange
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Async',
            endpint: 'render/async/single/image',
            button_value: 'Render Single Image'
        },
        {
            type: 'choice-listing',
            name: 'Models',
            values: models_list,
            ref: choiceListing
        },
        {
            type: 'range',
            name: 'Set ID',
            min: 0,
            max: 87,
            step: 1,
            unit: 'set',
            ref: setIdRange
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
            name: 'Camera ID',
            min: 0,
            max: 1,
            step: 1,
            unit: 'camera index',
            ref: cameraIdRange
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

    let blocker = false

    useEffect( 
        () => {
            
            if ( models_list.length === 0 && user.id > 0 && token !== '' && blocker === false ) {
                dispatch( modelCrudAsyncThunk.fetchGetAllModels( token ) )
                if ( models_list.length === 0 ) {
                    blocker = true
                }
            }
        
        }
    )

    const bodyComparer = ( refs ) => {

        return {
            fileName: refs[0].current.value.replace('.blend', ''),
            // fileName: 'testHand',
            rotate: refs[1].current.value / 62, // on backend 0.1 - 6.2 value
            cameraID: refs[2].current.value,
            nameSeries: 0,
            resolutionX: refs[3].current.value,
            resolutionY: refs[4].current.value
        }
    }

    return (
        <div>
            <AbstractWebsocket 
                addressWS={ '/single/image/' }
                inputList={ inputList }
                refList={ refList }
                bodyComparer={ bodyComparer }
            />
        </div>
    )
}

export default RenderSingleImageForm