import React, { useState } from 'react'

/**
 * 
 * @param { [ {}, {}, ...{} ] } inputList - list of dicts with info about input
 * @param { [] } refList - react ref objects list for handler validation
 * @param { } action - fetch method
 */
export const FormGenerator = ({
    inputList, refList,
    action
}) => {

    const handler = async (event) => {
        event.preventDefault()

        if ( inputList[0].action === 'Async' ) {
            await action(refList)
        } else if ( 
             inputList[0].action === 'Download'
             || inputList[0].action === 'Upload'
        ) {
            await action()
        } else {
            for (let i = 0; i < refList.length; i++) {
                if (refList[i].current.value === ''
                    && inputList[0].action !== 'Update'
                    || i === 0
                    && refList.length !== 1
                ) {
                    refList[i].current.focus()
                } else if (i === refList.length - 1) {
                    await action(refList)
                }
            }
        }
    }

    let info

    return (
        <form onSubmit={event => handler(event)} className="form">
            {
                inputList.map((input, key) => {

                    if (input.type === 'info') {
                        info = input
                    } else if (input.type === 'text') {
                        return (
                            <TextInputGenerator
                                input={input}
                                info={info}
                                key={key}
                            />
                        )
                    } else if (input.type === 'password') {
                        return (
                            <PasswordInputGenerator 
                                input={input}
                                info={info}
                                key={key}
                            />
                        )
                    } else if (input.type === 'links-listing') {
                        return (
                            <DownloadFilesListInputGenerator 
                                input={input}
                                info={info}
                                key={key}
                            />
                        )
                    } else if (input.type === 'file') {
                        return (
                            <UploadInputGenerator
                                input={input}
                                info={info}
                                key={key}
                            />
                        )
                    } else if (input.type === 'choice-listing') {
                        return (
                            <ChoiceListingGenerator 
                                input={input}
                                info={info}
                                key={key}
                            />
                        )
                    } else if (input.type === 'range') {
                        return (
                            <RangeInputGenerator 
                                input={input}
                                info={info}
                                key={key}
                            />
                        )
                    } else if (input.type === 'vector') {
                        return (
                            <VectorInputGenerator
                                input={input}
                                info={info}
                                key={key}
                            />
                        )
                    }
                })
            }
            {
                info.button_value === ''
                ? <></>
                : <button 
                      type='submit'
                  >
                      { info.button_value }
                  </button>
            }
            
        </form>
    )
}

/**
 * Text input generator, example:
 * @param {
 * {    
 *  type: 'text',   
 *  name: 'name',       
 *  ref: React.createRef()  
 * }    } input - basic text input 
 * @param {
 * {
 *  type: 'info',
 *  action: 'Update'
 *  endpoint: 'Album'
 * }    } info - information about form
 */
const TextInputGenerator = ({
    input, info
}) => {
    return (
        <div className="input_generate">
            <div className="input_labels">
                {input.name + ':'}
            </div>
            <input
                id={input.name + info.action + info.endpoint + 'Input'}
                autoComplete='off'
                ref={input.ref}
            />
        </div>
    )
}

/**
 * Text input generator, example:
 * @param {
 * {    
 *  type: 'password',   
 *  name: 'name',       
 *  ref: React.createRef()  
 * }    } input - basic text input 
 * @param {
 * {
 *  type: 'info',
 *  action: 'Update'
 *  endpoint: 'Album'
 * }    } info - information about form
 */
const PasswordInputGenerator = ({
    input, info
}) => {
    return (
        <div className="input_generate">
            <div className="input_labels">
                {input.name + ':'}
            </div>
            <input
                id={input.name + info.action + info.endpoint + 'Input'}
                autoComplete='off'
                ref={input.ref}
                type='password'
            />
        </div>
    )
}

/**
 * Text input generator, example:
 * @param {
 * {    
 *  type: 'drop-box',   
 *  name: 'name',
 *  values: list,
 *  link: link to the file
 * }    } input - basic text input 
 * @param {
 * {
 *  type: 'info',
 *  action: 'Update'
 *  endpoint: 'Album'
 * }    } info - information about form
 */
const DownloadFilesListInputGenerator = ({
    input, info
}) => {

    return (
        <div
            id={input.name + info.action + info.endpoint + 'DropBox'}
        >
            {input.name + ':'}
            {
                input.values.map( (item, index) => {

                        return (
                            <div
                                key={ item }
                            >
                                <a 
                                    href={ input.link + index + '/' }
                                >
                                    { item }
                                </a>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

/**
 * Text input generator, example:
 * @param {
 * {    
 *  type: 'drop-box',   
 *  name: 'name',
 *  values: list,
 *  ref: React.createRef()
 * }    } input - basic text input 
 * @param {
 * {
 *  type: 'info',
 *  action: 'Update'
 *  endpoint: 'Album'
 * }    } info - information about form
 */
const ChoiceListingGenerator = ({
    input, info
}) => {

    const __handleRef = ( item ) => {
        input.ref.current = {
            value: item
        }
    }

    return (
        <div
            id={input.name + info.action + info.endpoint + 'DropBox'}
        >
            {input.name + ':'}
            {
                input.values.map( (item) => {
                        return (
                            <div
                                key={ item }
                                onClick={ () => __handleRef( item ) }
                            >
                                    { item }
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

/**
 * Upload file input generator, example:
 * @param {
 * {    
 *  type: 'file',   
 *  name: 'name',   
 *  endpoint: 'Album',     
 *  fileType: 'image' or 'audio',       
 *  dropInfo: dropInfo, setDropInfo: setDropInfo(), #useState  
 *  file: file, setFile: setFile()  #useState
 * }    } input -  
 */
const UploadInputGenerator = ({
    input, info
}) => {

    const onLoadFile = async (event) => {
        event.preventDefault()
        let data = event.target.files[0]
        // input.setFile(await toBase64(data))
        input.setFile( data )
        setDropInfos(data.name, data.size)
    }

    const onLoadFileDrop = async (event) => {
        event.preventDefault()
        event.persist()
        let data = event.dataTransfer.files[0]
        // input.setFile(await toBase64(data))
        input.setFile( data )
        setDropInfos(data.name, data.size)
    }

    const toBase64 = async (file) => new Promise((resolve, reject) => {
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => resolve(fileReader.result)
        fileReader.onerror = error => reject(error)
    })

    const setDropInfos = (name, size) => {
        input.setDropInfo(
            'name: "'
            + name
            + '"\nsize: '
            + (Math.round(size / 100 + 'e-2') / 100)
            + ' MB'
        )
    }

    return (
        <div onDrop={event => onLoadFileDrop(event)} >
            <pre style={{ marginLeft: '40px' }}>
                {input.dropInfo}
            </pre>
            <input
                style={{ marginTop: '-55px' }}
                id={input.name + info.action + info.endpoint + 'Input'}
                className='upload_input'
                type='file'
                accept={input.fileType + '/*'}
                autoComplete='off'
                onChange={event => onLoadFile(event)}
            />
        </div>
    )
}

/**
 * Text input generator, example:
 * @param {
 * {    
 *  type: 'range',   
 *  name: 'name',
 *  min: min range value,
 *  max: max range value,
 *  step: step of value,
 *  unit: unit of range value,       
 *  ref: React.createRef()  
 * }    } input - basic text input 
 * @param {
 * {
 *  type: 'info',
 *  action: 'Update'
 *  endpoint: 'Album'
 * }    } info - information about form
 */
const RangeInputGenerator = ({
    input, info
}) => {

    let name = input.name + info.action + info.endpoint + 'Input'

    const [value, setValue] = useState(0)

    return (
        <div>
            <div>
                {input.name + ': ' + value + ' ' + input.unit }
            </div>
            <input
                style={ { width: '380px' } }
                id={name}
                name={name}
                min={input.min}
                max={input.max}
                defaultValue={input.min}
                step={input.step}
                ref={input.ref}
                type='range'
                onChange={ event => setValue( event.target.value ) }
            />
        </div>
    )
}

const RangeGenerator = ({ 
    key,
    label,
    labelStyle,
    valueStyle,
    style,
    name,
    unit,
    min,
    max,
    defaultValue,
    step,
    reference
}) => {

    const [value, setValue] = useState(0)

    return (
        <div style={ { display: 'flex' } }>
            <div style={ labelStyle }>
                { label + ': ' }
            </div>
            <input
                key={key}
                style={ style }
                id={ name }
                name={ name }
                min={min}
                max={max}
                defaultValue={ defaultValue }
                step={step}
                ref={reference}
                type='range'
                onChange={ event => setValue( event.target.value ) }
            />
            <div style={ valueStyle }>
                { value + ' ' + unit }
            </div>
        </div>
    )

}

/**
 * Text input generator, example:
 * @param {
 * {    
 *  type: 'vector',   
 *  name: 'name',     
 *  refDict: 
 *  {
 *      x: React.createRef(),
 *      y: React.createRef(),
 *      z: React.createRef()
 *  }  
 * }    } input - basic text input 
 * @param {
 * {
 *  type: 'info',
 *  action: 'Update'
 *  endpoint: 'Album'
 * }    } info - information about form
 */
const VectorInputGenerator = ({
    input, info
}) => {

    return (
        <div style={ { width: '' } }>
            <div style={ { width: '100%' } }>
                { input.name }
            </div>
            <div style={ { display: 'flex' } }>
                {
                    Object.keys(input.refDict).map( (key) => {

                            let name = input.name + key + info.action + info.endpoint + 'Input'
                            return (
                                <div style={ { display: 'flex', width: '140px' } }>
                                    <RangeGenerator 
                                        key={key}
                                        label={key}
                                        labelStyle={ { width: '5px', marginTop: '15px' } }
                                        valueStyle={ { width: '5px', marginTop: '15px', marginLeft: '5px' } }
                                        style={ { width: '80px' } }
                                        name={name}
                                        unit={ '' }
                                        min={input.min[key]}
                                        max={input.max[key]}
                                        defaultValue={input.min[key]}
                                        step={0.1}
                                        reference={input.refDict[key]}
                                    />
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}


export default FormGenerator