import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { renderWebsocketSelector } from '../../../redux/slices/renderWebsocketSlice'
import { connect, saveMessage, disconnect } from '../../../redux/slices/renderWebsocketSlice'

import FormGenerator from '../formGenerator'


const AbstractWebsocket = ({ addressWS, inputList, refList }) => {

    let web_socket = null

    const dispatch = useDispatch()

    const { 
        web_socket_address,
        address,
        room_uuid,
        messages,
        connected
    } = useSelector( renderWebsocketSelector )


    const handleConnect = ( event ) => {

        event.preventDefault()

        if ( web_socket === null && address === '' && room_uuid === '') {
            dispatch(
                connect( 
                    {
                        address: addressWS
                    } 
                )
            )
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
            
            web_socket.onopen = (event) => { 
                
                web_socket.send(
                    JSON.stringify(
                        body
                    )
                )

            }

        } catch (error) {
            web_socket.close()
            dispatch(
                disconnect()
            )
            console.log(error)
        }
    }

    const handleDisconnect = ( event ) => {

        event.preventDefault()

        if ( web_socket !== null && address !== '' && room_uuid !== '' ) {
            try {
                web_socket.close()
                dispatch(
                    disconnect()
                )
            } catch (error) {
                console.log(error)
            }
        } else if ( address !== '' && room_uuid !== '' ) {

        }

        console.log('disconnect')

    }

    if ( web_socket !== null && connected === true && address !== '' ) {
        web_socket.onmessage = (event) => {
            console.log( event.data )
            dispatch(
                saveMessage(
                    {
                        message: JSON.parse( event.data )
                    }
                )
            )
        }
    }

    useEffect( 
        () => {

            if ( web_socket_address !== '' && web_socket === null ) {
                web_socket = new WebSocket( web_socket_address )
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

export default AbstractWebsocket