import React, { useState, useEffect } from 'react'

import ModelShowAndDownloadForm from '../../../components/forms/model_crud/modelShowModelsAndDownload'
import ModelUpload from '../../../components/forms/model_crud/modelUpload'


const __handleSwap = (name, movement) => {

    let display = {
        display: 'block'
    }

    let hide = {
        display: 'none'
    }

    if ( Object.keys(movement['movement']).includes(name) ) {
        if (movement['movement'][name])
            return display
        else
            return hide
    } else {
        return hide
    }

}

const ModelCrudIndex = ( movement ) => {


    return (
        <div>
            <div style={ __handleSwap( 'show_models_and_download', movement ) }>
                <ModelShowAndDownloadForm />
            </div>
            <div style={ __handleSwap( 'upload_model', movement ) }>
                <ModelUpload />
            </div>
        </div>
    )
}

export default ModelCrudIndex