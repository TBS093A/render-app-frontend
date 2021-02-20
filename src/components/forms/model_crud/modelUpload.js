import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'
import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import FormGenerator from '../formGenerator'


const ModelUploadForm = () => {

    const dispatch = useDispatch()

    const [blend, setBlend] = useState('')
    const [blendInfo, setBlendInfo] = useState('Drop/Click\nfor upload "*.blend" file')
    
    const { upload_blend_file_status } = useSelector( modelCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let inputList = [
        {
            type: 'info',
            action: 'Upload',
            endpint: 'model/upload',
            button_value: 'Upload Model'
        },
        {
            type: 'file',
            name: 'Model',
            fileType: 'blender',
            dropInfo: blendInfo,
            setDropInfo: setBlendInfo,
            file: blend,
            setFile: setBlend
        }
    ]

    const handleModelUpload = () => {
        let body = {
            user_id: user.id,
            file: blend,
            token: token
        }
        console.log( body )
        dispatch( modelCrudAsyncThunk.fetchUploadModel( body ) )
    }

    return (
        <div 
            className="float_form_model"
            style={ { marginTop: '17%' } }
        >
            <FormGenerator 
                inputList={ inputList }
                refList={ [] }
                action={ handleModelUpload }
            />
        </div>
    )
}

export default ModelUploadForm