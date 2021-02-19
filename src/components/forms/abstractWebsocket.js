import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { renderWebsocketSelector } from '../../redux/slices/renderWebsocketSlice'
import { connect, saveMessage, resetMessages, disconnect } from '../../redux/slices/renderWebsocketSlice'

import FormGenerator from './formGenerator'


const ProgressBar = () => {

    const {
        percents,
        connect
    } = useSelector( renderWebsocketSelector )

    return (
        <div style={ { width: '300px', height: '20px' } }>
            <div style={ { width: '100%', height: '100%', marginBottom: '-20px', textAlign: 'center' } }>
                {
                    typeof percents === 'number'
                    ? 'Progress: ' + percents + '%'
                    : percents
                }
            </div>
            <div style={ { width: '100%', height: '100%', backgroundColor: 'white' } }>
                {
                    typeof percents === 'number'
                    ? <div style={ { width: percents + '%', height: '100%', backgroundColor: 'green' } }>
                      </div>
                    : <div style={ { width: '100%', height: '100%', backgroundColor: 'green' } }>
                      </div>
                }
            </div>
        </div>
    )

}


const AbstractWebsocket = ({ addressWS, inputList, refList, bodyComparer }) => {

    const [web_socket, setWebsocket] = useState(null)

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


    }

    const handleSendMessage = ( refs ) => {
        
        let body = bodyComparer( refs )

        console.log( body )
        try {

            dispatch(
                saveMessage(
                    {
                        message: { info: 0 } // start
                    }
                )
            )
            
            web_socket.send(
                JSON.stringify(
                    body
                )
            )

        } catch (error) {

            web_socket.close()
            dispatch(
                disconnect()
            )
            setWebsocket(null)
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
            dispatch(
                disconnect()
            )
        }

        setWebsocket(null)

        console.log('disconnect')

    }

    useEffect( 
        () => {

            if ( web_socket_address !== '' && web_socket === null ) {

                console.log( 'connect' )
                
                setWebsocket(new WebSocket( web_socket_address ))
            }

            if ( web_socket !== null ) {

                web_socket.onmessage = (event) => {
                    console.log( event.data )
                    if ( messages[ messages.length - 1 ] !== JSON.parse( event.data ) ) {
                        dispatch(
                            saveMessage(
                                {
                                    message: JSON.parse( event.data )
                                }
                            )
                        )
                    }
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
            <ProgressBar />
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
            <div>
            {
                messages.map( (item) => {
                        return (
                            <div>
                                <>
                                    {
                                        Object.keys(item).map( (key) => {

                                                if ( key == 'details' ) {
                                                    return (
                                                        <>
                                                            {
                                                                Object.keys(item[key]).map( (keyTwo) => {
                                                                        return (
                                                                            <div>
                                                                                { '    ' + keyTwo + ': ' + item[key][keyTwo] + ' ' }
                                                                            </div>
                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        </>
                                                    )
                                                } else if ( key === 'image' ) {
                                                    return (
                                                        <img 
                                                            src={ 'data:image/png;base64, ' + item[key] }
                                                            style={ { width: '300px', height: '200px' } }
                                                        />
                                                    )
                                                } else {
                                                    return (
                                                        <>
                                                        { key + ': ' + item[key] + ' ' }
                                                        </>
                                                    )
                                                }
                                            } 
                                        )
                                    }
                                </>
                            </div>
                        )
                    }
                )
            }
            </div>
        </>
    )
}

export default AbstractWebsocket