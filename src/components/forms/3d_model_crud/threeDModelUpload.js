import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { threeDModelCrudSelector } from '../../../redux/slices/threeDModelCrudSlice'
import { uploadModel } from '../../../redux/asyncThunks/threeDModelCrudAsyncThunk'

import FormGenerator from '../formGenerator'

const ModelUploadForm = () => {
    const dispatch = useDispatch()

    const [blend, setBlend] = useState('')
    const [blendInfo, setBlendInfo] = useState('Drop/Click\nfor upload "*.blend" file')
    
    const { upload_blend_file_status } = useSelector( threeDModelCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    const inputList = [
        {
            type: 'info',
            action: 'Upload',
            endpoint: 'model/upload',
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
        if (!blend) {
            return;
        }

        dispatch( uploadModel({
            user_id: user.id,
            file: blend,
            token: token
        }));
    }

    return (
        <div>
            <FormGenerator 
                inputList={ inputList }
                refList={ [] }
                action={ handleModelUpload }
            />
            <p>
                {   
                    typeof upload_blend_file_status === 'string'
                    ? ''
                    : 'info' in upload_blend_file_status 
                        ? upload_blend_file_status.info
                        : ''
                }
            </p>
        </div>
    )
}

export default ModelUploadForm