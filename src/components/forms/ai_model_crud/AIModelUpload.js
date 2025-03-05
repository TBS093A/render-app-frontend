import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { aiModelCrudSelector } from '../../../redux/slices/aiModelCrudSlice'
import { uploadModel } from '../../../redux/asyncThunks/aiModelCrudAsyncThunk'

import FormGenerator from '../formGenerator'

const AIModelUploadForm = () => {
    const dispatch = useDispatch()

    const [model, setModel] = useState('')
    const [modelInfo, setModelInfo] = useState('Drop/Click\nfor upload AI model file')
    
    const { upload_model_status } = useSelector(aiModelCrudSelector)
    const { user, token } = useSelector(userAuthSelector)

    const inputList = [
        {
            type: 'info',
            action: 'Upload',
            endpoint: 'ai-model/upload',
            button_value: 'Upload AI Model'
        },
        {
            type: 'file',
            name: 'Model',
            fileType: 'ai',
            dropInfo: modelInfo,
            setDropInfo: setModelInfo,
            file: model,
            setFile: setModel
        }
    ]

    const handleModelUpload = () => {
        if (!model) {
            return;
        }

        dispatch(uploadModel({
            user_id: user.id,
            file: model,
            token: token
        }));
    }

    return (
        <div>
            <FormGenerator 
                inputList={inputList}
                refList={[]}
                action={handleModelUpload}
            />
            <p>
                {   
                    !upload_model_status
                    ? ''
                    : typeof upload_model_status === 'string'
                        ? ''
                        : 'info' in upload_model_status 
                            ? upload_model_status.info
                            : ''
                }
            </p>
        </div>
    )
}

export default AIModelUploadForm 