import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector } from '../../../redux/slices/userAuthSlice'
import { modelCrudSelector } from '../../../redux/slices/modelCrudSlice'

import modelCrudAsyncThunk from '../../../redux/asyncThunks/modelCrudAsyncThunk'

import AbstractWebsocket from '../abstractWebsocket'


const refVectorGenerator = () => {
    return {
        x: React.createRef(),
        y: React.createRef(),
        z: React.createRef(),
    }
}


const RenderVectorSingleSetForm = () => {

    const dispatch = useDispatch()

    const choiceListing = React.createRef()
    const rotateRange = React.createRef()
    const cameraIdRange = React.createRef()
    const resolutionXRange = React.createRef()
    const resolutionYRange = React.createRef()

    // const IK_nadgarstek = refVectorGenerator()
    // const IK_joint3_R = refVectorGenerator()
    // const IK_joint4_R = refVectorGenerator() 
    // const IK_joint5_R = refVectorGenerator() 
    // const IK_joint6_R = refVectorGenerator() 
    const IK_maly_1_R = refVectorGenerator()
    const IK_maly_2_R = refVectorGenerator()
    const IK_maly_3_R = refVectorGenerator()
    const IK_serdeczny_1_R = refVectorGenerator() 
    const IK_serdeczny_2_R = refVectorGenerator() 
    const IK_serdeczny_3_R = refVectorGenerator() 
    const IK_srodkowy_1_R = refVectorGenerator() 
    const IK_srodkowy_2_R = refVectorGenerator() 
    const IK_srodkowy_3_R = refVectorGenerator() 
    const IK_wskazujacy_1_R = refVectorGenerator() 
    const IK_wskazujacy_2_R = refVectorGenerator() 
    const IK_wskazujacy_3_R = refVectorGenerator() 
    const IK_kciuk_0_R = refVectorGenerator()
    const IK_kciuk_1_R = refVectorGenerator() 
    const IK_kciuk_2_R = refVectorGenerator()


    const { models_list } = useSelector( modelCrudSelector )
    const { user, token } = useSelector( userAuthSelector )

    let refList = [
        choiceListing,
        rotateRange,
        cameraIdRange,
        resolutionXRange,
        resolutionYRange,
        {
            // IK_nadgarstek: IK_nadgarstek,
            // IK_joint3_R: IK_joint3_R,
            // IK_joint4_R: IK_joint4_R,
            // IK_joint5_R: IK_joint5_R, 
            // IK_joint6_R: IK_joint6_R, 
            IK_maly_1_R: IK_maly_1_R,
            IK_maly_2_R: IK_maly_2_R,
            IK_maly_3_R: IK_maly_3_R,
            IK_serdeczny_1_R: IK_serdeczny_1_R, 
            IK_serdeczny_2_R: IK_serdeczny_2_R, 
            IK_serdeczny_3_R: IK_serdeczny_3_R, 
            IK_srodkowy_1_R: IK_srodkowy_1_R, 
            IK_srodkowy_2_R: IK_srodkowy_2_R, 
            IK_srodkowy_3_R: IK_srodkowy_3_R, 
            IK_wskazujacy_1_R: IK_wskazujacy_1_R, 
            IK_wskazujacy_2_R: IK_wskazujacy_2_R, 
            IK_wskazujacy_3_R: IK_wskazujacy_3_R, 
            IK_kciuk_0_R: IK_kciuk_0_R,
            IK_kciuk_1_R: IK_kciuk_1_R, 
            IK_kciuk_2_R: IK_kciuk_2_R,
        }
    ]

    const fingers_max = {
        x: 10,
        y: 10,
        z: 10
    }
    const fingers_min = {
        x: -0.7,
        y: -0.7,
        z: -0.7
    }

    const validate_fingers = {
        thumb: {
            max:{ 
                part_0: {
                    y: 0.5,
                    x: 0.5,
                    z: 0.6
                },
                part_1: {
                    y: 0,
                    x: 0,
                    z: 0.7,
                },
                part_2: {
                    y: 0,
                    x: 0,
                    z: 0.7,
                }
            },
            min: {
                part_0: {
                    y: -0.3,
                    x: 0,
                    z: -0.3,
                },
                part_1: {
                    y: -0.1,
                    x: 0,
                    z: 0,
                },
                part_2: {
                    y: 0,
                    x: 0,
                    z: -0.4,
                }
            }
        },
        others: {
            max: {
                part_1: {
                    y: 0.2,
                    x: 0,
                    z: 0.7
                },
                part_2: {
                    y: 0,
                    x: 0,
                    z: 1.6
                },
                part_3: {
                    y: 0,
                    x: 0,
                    z: 0.7
                }
            },
            min: {
                part_1: {
                    y: -0.3,
                    x: 0,
                    z: -0.3
                },
                part_2: {
                    y: 0,
                    x: 0,
                    z: 0
                },
                part_3: {
                    y: 0,
                    x: 0,
                    z: 0
                }
            }
        }

    }

    let inputList = [
        {
            type: 'info',
            action: 'Async',
            endpint: 'render/async/single/set',
            button_value: 'Render Single Set'
        },
        {
            type: 'choice-listing',
            name: 'Models',
            values: models_list,
            ref: choiceListing
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
        // {
        //     type: 'vector',
        //     name: 'Wirst (experimental)',
        //     native: 'Nadgarstek',
        //     min: fingers_min,
        //     max: fingers_max,
        //     refDict: IK_nadgarstek,
        // },
        // {
        //     type: 'vector',
        //     name: 'Litte Finger Joint 3 (experimental)',
        //     native: 'Mały Palec Joint 3',
        //     min: fingers_min,
        //     max: fingers_max,
        //     refDict: IK_joint3_R,
        // },
        // {
        //     type: 'vector',
        //     name: 'Ring Finger Joint 4 (experimental)',
        //     native: 'Serdeczny Palec Joint 4',
        //     min: fingers_min,
        //     max: fingers_max,
        //     refDict: IK_joint4_R,
        // },
        // {
        //     type: 'vector',
        //     name: 'Middle Finger Joint 5 (experimental)',
        //     native: 'Środkowy Palec Joint 5',
        //     min: fingers_min,
        //     max: fingers_max,
        //     refDict: IK_joint5_R,
        // },
        // {
        //     type: 'vector',
        //     name: 'Index Finger Joint 6 (experimental)',
        //     native: 'Wskazujący Palec Joint 6',
        //     min: fingers_min,
        //     max: fingers_max,
        //     refDict: IK_joint6_R,
        // },
        {
            type: 'vector',
            name: 'Litte Finger 1',
            native: 'Mały 1',
            min: validate_fingers.others.min.part_1,
            max: validate_fingers.others.max.part_1,
            refDict: IK_maly_1_R,
        },
        {
            type: 'vector',
            name: 'Litte Finger 2',
            native: 'Mały 2',
            min: validate_fingers.others.min.part_2,
            max: validate_fingers.others.max.part_2,
            refDict: IK_maly_2_R,
        },
        {
            type: 'vector',
            name: 'Litte Finger 3',
            native: 'Mały 3',
            min: validate_fingers.others.min.part_3,
            max: validate_fingers.others.max.part_3,
            refDict: IK_maly_3_R,
        },
        {
            type: 'vector',
            name: 'Ring Finger 1',
            native: 'Serdeczny 1',
            min: validate_fingers.others.min.part_1,
            max: validate_fingers.others.max.part_1,
            refDict: IK_serdeczny_1_R,
        },
        {
            type: 'vector',
            name: 'Ring Finger 2',
            native: 'Serdeczny 2',
            min: validate_fingers.others.min.part_2,
            max: validate_fingers.others.max.part_2,
            refDict: IK_serdeczny_2_R,
        },
        {
            type: 'vector',
            name: 'Ring Finger 3',
            native: 'Serdeczny 3',
            min: validate_fingers.others.min.part_3,
            max: validate_fingers.others.max.part_3,
            refDict: IK_serdeczny_3_R,
        },
        {
            type: 'vector',
            name: 'Middle Finger 1',
            native: 'Środkowy 1',
            min: validate_fingers.others.min.part_1,
            max: validate_fingers.others.max.part_1,
            refDict: IK_srodkowy_1_R,
        },
        {
            type: 'vector',
            name: 'Middle Finger 2',
            native: 'Środkowy 2',
            min: validate_fingers.others.min.part_2,
            max: validate_fingers.others.max.part_2,
            refDict: IK_srodkowy_2_R,
        },
        {
            type: 'vector',
            name: 'Middle Finger 3',
            native: 'Środkowy 3',
            min: validate_fingers.others.min.part_3,
            max: validate_fingers.others.max.part_3,
            refDict: IK_srodkowy_3_R,
        },
        {
            type: 'vector',
            name: 'Index Finger 1',
            native: 'Wskazujący 1',
            min: validate_fingers.others.min.part_1,
            max: validate_fingers.others.max.part_1,
            refDict: IK_wskazujacy_1_R,
        },
        {
            type: 'vector',
            name: 'Index Finger 2',
            native: 'Wskazujący 2',
            min: validate_fingers.others.min.part_2,
            max: validate_fingers.others.max.part_2,
            refDict: IK_wskazujacy_2_R,
        },
        {
            type: 'vector',
            name: 'Index Finger 3',
            native: 'Wskazujący 3',
            min: validate_fingers.others.min.part_3,
            max: validate_fingers.others.max.part_3,
            refDict: IK_wskazujacy_3_R,
        },
        {
            type: 'vector',
            name: 'Thumb 0',
            native: 'Kciuk 0',
            min: validate_fingers.thumb.min.part_0,
            max: validate_fingers.thumb.max.part_0,
            refDict: IK_kciuk_0_R,
        },
        {
            type: 'vector',
            name: 'Thumb 1',
            native: 'Kciuk 1',
            min: validate_fingers.thumb.min.part_1,
            max: validate_fingers.thumb.max.part_1,
            refDict: IK_kciuk_1_R,
        },
        {
            type: 'vector',
            name: 'Thumb 2',
            native: 'Kciuk 2',
            min: validate_fingers.thumb.min.part_2,
            max: validate_fingers.thumb.max.part_2,
            refDict: IK_kciuk_2_R,
        },
    ]

    let blocker = false

    useEffect( 
        () => {
            
            if ( models_list.length === 0 && user.id > 0 && token !== '' && blocker === false ) {
                dispatch( modelCrudAsyncThunk.fetchGetAllModels( token ) )
                if ( models_list.length === 0 ) {
                    blocker = true
                }
            }
        
        }
    )

    const bodyComparer = ( refs ) => {

        let vectors = {}

        console.log( refs )

        Object.keys(refs[5]).map(
            ( key ) => {
                let singleFinger = {
                    scale: 0,
                    x: 0,
                    y: 0,
                    z: 0
                }
                singleFinger['scale'] = 0.9
                singleFinger['x'] = parseFloat(refs[5][key]['x'].current.value)
                singleFinger['y'] = parseFloat(refs[5][key]['y'].current.value)
                singleFinger['z'] = parseFloat(refs[5][key]['z'].current.value)
                vectors[key] = singleFinger
            }
        )

        return {
            fileName: refs[0].current.value.replace('.blend', ''),
            // fileName: 'testHand',
            angle: refs[1].current.value / 62, // on backend 0.1 - 6.2 value
            cameraID: refs[2].current.value,
            resolutionX: refs[3].current.value,
            resolutionY: refs[4].current.value,
            vectors: vectors
        }
    }

    return (
        <>
            <AbstractWebsocket 
                addressWS={ '/vector/single/set/' }
                inputList={ inputList }
                refList={ refList }
                bodyComparer={ bodyComparer }
            />
        </>
    )
}

export default RenderVectorSingleSetForm