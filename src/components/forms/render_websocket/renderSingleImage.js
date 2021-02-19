import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'

import { renderWebsocketSelector } from '../../../redux/slices/renderWebsocketSlice'
import { connect, saveMessage, disconnect } from '../../../redux/slices/renderWebsocketSlice'

import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import FormGenerator from '../formGenerator'


const RenderSingleImageForm = () => {

    let web_socket = null

    const dispatch = useDispatch()
    const stableDispatch = useCallback(dispatch, [])

    const choiceListing = React.createRef()
    const setIdRange = React.createRef()
    const rotateRange = React.createRef()
    const cameraIdRange = React.createRef()
    const resolutionXRange = React.createRef()
    const resolutionYRange = React.createRef()
    
    const { 
        web_socket_address,
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

    const handleConnect = ( event ) => {

        event.preventDefault()

        if ( web_socket === null && address === '' && room_uuid === '') {
            stableDispatch(
                connect( 
                    {
                        address: '/single/image/'
                    } 
                )
            )
            if (web_socket_address !== '') {
                web_socket = new WebSocket( web_socket_address )
            }
        }

        console.log('connect')

    }

    const handleSendMessage = ( refs ) => {

        let rotate_conv = refs[2].current.value / 62  // on backend 0.1 - 6.2 value

        let body = {
            // fileName: refs[0].current.value,
            fileName: 'testHand',
            setID: refs[1].current.value,
            rotate: rotate_conv,
            nameSeries: 0,  // index render picture in set (useless on the front & disable)
            cameraID: refs[3].current.value,
            resolutionX: refs[4].current.value,
            resolutionY: refs[5].current.value
        }
        console.log( body )
        try {
            web_socket.send(
                JSON.stringify(
                    body
                )
            )
        } catch (error) {
            web_socket.close()
            stableDispatch(
                disconnect()
            )
            console.log(error)
        }
    }

    const handleDisconnect = ( event ) => {

        event.preventDefault()

        if ( address !== '' && room_uuid !== '') {
            try {
                web_socket.close()
                stableDispatch(
                    disconnect()
                )
            } catch (error) {
                console.log(error)
            }
        }

        console.log('disconnect')

    }

    if ( connected === true && address !== '' && web_socket !== null ) {
        web_socket.onmessage = (event) => {
            console.log( event.data )
            // stableDispatch(
            //     saveMessage(
            //         {
            //             message: JSON.parse( event.data )
            //         }
            //     )
            // )
        }
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
                connected
                ? 
                    <button onClick={ (event) => handleDisconnect(event) }>
                        Disconnect
                    </button>
                :
                    <button onClick={ (event) => handleConnect(event) }>
                        Connect
                    </button>
            }
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