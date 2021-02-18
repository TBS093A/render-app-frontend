import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'
import { renderWebsocketSelector } from '../../../redux/slices/renderWebsocketSlice'

import { connect, saveMessage, disconnect } from '../../../redux/slices/renderWebsocketSlice'

import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import FormGenerator from '../formGenerator'


const RenderSingleImageForm = () => {

    const dispatch = useDispatch()

    const choiceListing = React.createRef()
    const setIdRange = React.createRef()
    const rotateRange = React.createRef()
    const cameraIdRange = React.createRef()
    const resolutionXRange = React.createRef()
    const resolutionYRange = React.createRef()
    
    const { 
        web_socket,
        address,
        room_uuid,
        messages,
        connected
    } = useSelector( renderWebsocketSelector )

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
            type: 'chice-listing',
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

    const handleSendMessage = ( refs ) => {

        let rotate_conv = refs[2].current.value / 62  // on backend 0.1 - 6.2 value

        let body = {
            // fileName: refs[0].current.value,
            fileName: 'testHand.blend',
            setID: refs[1].current.value,
            rotate: rotate_conv,
            nameSeries: 0,  // index render picture in set (useless on the front & disable)
            cameraID: refs[3].current.value,
            resolutionX: refs[4].current.value,
            resolutionY: refs[5].current.value
        }
        console.log( body )
        web_socket.send(
            JSON.stringify(
                body
            )
        )
    }

    let blocker = false

    useEffect( 
        () => {
            
            if ( models_list.length === 0 && user.id > 0 && token !== '' && !blocker ) {
                dispatch( modelCrudAsyncThunk.fetchGetAllModels( token ) )
                if ( models_list.length === 0 ) {
                    blocker = true
                }
            }

            if ( web_socket === null && address === '' && room_uuid === '') {
                connect( 
                    {
                        address: '/single/image/'
                    } 
                )
            }

            if ( address !== '' && web_socket !== null ) {
                web_socket.onmessage = (event) => { 
                    saveMessage( 
                        {
                            message: JSON.parse( event.data ) 
                        }
                    ) 
                }
            }
        
        }
    )

    return (
        <>
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ handleSendMessage }
            />
            {
                messages.map( (item) => {
                        return (
                            <>
                                <div>
                                    { item.info }
                                </div>
                                <div>
                                    { item.details }
                                </div>
                                <div>
                                    { item.group }
                                </div>
                            </>
                        )
                    }
                )
            }
        </>
    )
}

export default RenderSingleImageForm