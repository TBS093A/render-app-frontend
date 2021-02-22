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
        <div className="progress_bar_form">
            <div>
                {
                    typeof percents === 'number'
                    ? 'Progress: ' + percents + '%'
                    : percents
                }
            </div>
            <div>
                {
                    !isNaN(percents) 
                    && percents.toString().indexOf('.') != -1
                    ? <div 
                          className='progress_bar_progress' 
                          style={ { width: percents + '%', height: '100%', backgroundColor: 'green' } }
                      >
                      </div>
                    : percents === 'render success'
                        ? <div 
                              className='progress_bar_progress'
                              style={ { width: '100%', height: '100%', backgroundColor: 'green' } }
                          >
                          </div>
                        : <></>
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
            <div 
                className="float_form_render_async"
                style={ 
                    connected 
                    ? addressWS === '/vector/single/set/' || addressWS === '/vector/single/image/'
                        ? { marginTop: '10%', overflowY: 'scroll' }
                        : { marginTop: '10%' } 
                    : { marginTop: '100%' } 
                }
            >
                <FormGenerator 
                    inputList={ inputList }
                    refList={ refList }
                    action={ handleSendMessage }
                />
            </div>
            <div className="float_form_connect">
                <p>
                    { addressWS }
                </p>
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
            </div>
            <div 
                className="float_form_console"
                style={ connected ? { marginTop: '25%', height: '200px' } : { marginTop: '15%', height: '10px' } }
            >
                <p>
                    console:
                </p>
                <div className="console_data">
                    {
                        messages.slice(0).reverse().map( (item) => {
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
            </div>
        </>
    )
}

export default AbstractWebsocket