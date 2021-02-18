import React, { useState, useEffect } from 'react'

import RenderShowAndDownloadForm from '../../../components/forms/render_crud/renderShowReadyRendersAndDownload'

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
    } else if (Object.keys(movement['movement']['render_functionality']).includes(name)) {
        if (movement['movement'][name])
            return display
        else
            return hide
    } else {
        return hide
    }

}

const RenderIndex = ( movement ) => {

    return (
        <div>
            <div style={ __handleSwap( 'show_ready_renders_and_download', movement ) }>
                <RenderShowAndDownloadForm />
            </div>
        </div>
    )
}

export default RenderIndex