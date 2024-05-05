import React, { useState, useEffect } from 'react'

// import { useSelector, useDispatch } from 'react-redux'

// import { userCrudSelector } from '../../../redux/slices/userCrudSlice'
// import userCrudAsyncThunk from '../../../redux/asyncThunks/userCrudAsyncThunk'

import FormGenerator from '../formGenerator'


const UserRegisterForm = () => {

    const usernameInput = React.createRef()
    const passwordInput = React.createRef()
    const confirmPasswordInput = React.createRef()

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const [usernameValidationInfo, setUsernameValidationInfo] = useState("Empty")
    const [passwordValidationInfo, setPasswordValidationInfo] = useState("Empty")
    const [confirmPasswordValidationInfo, setConfirmPasswordValidationInfo] = useState("Empty")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [allowButtonAction, setAllowButtonAction] = useState(false)

    const usernameValidation = (event) => {
        if (event.target.value === "") {
            setUsernameValidationInfo("Email is required.")
        } else if(!emailRegex.test(event.target.value)) {
            setUsernameValidationInfo("Please provide correct email")
        } else {
            setUsernameValidationInfo("Success")
        }
    }

    const passwordValidation = (event) => {

        setPassword(event.target.value)

        if (event.target.value === "") {
            setPasswordValidationInfo("Password is required.")
        } else if(!passwordRegex.test(event.target.value)) {
            setPasswordValidationInfo("Password require:\n - At least 8 characters,\n - At least one uppercase letter,\n - At least one lowercase letter,\n - At least one digit,\n - At least one special character.")
        } else {
            setPasswordValidationInfo("Success")
        }

        if(event.target.value !== confirmPassword) {
            setConfirmPasswordValidationInfo("Passwords are different.")
        } else {
            setConfirmPasswordValidationInfo("Success")
        }
    }

    const confirmPasswordValidation = (event) => {

        setConfirmPassword(event.target.value)

        if(event.target.value !== password) {
            setConfirmPasswordValidationInfo("Passwords are different.")
        } else {
            setConfirmPasswordValidationInfo("Success")
        }
    }

    useEffect(() => {
            setAllowButtonAction(
                usernameValidationInfo === "Success"
                && passwordValidationInfo === "Success"
                && confirmPasswordValidationInfo === "Success"
            )
        }, [
            allowButtonAction,
            usernameValidationInfo,
            passwordValidationInfo,
            confirmPasswordValidationInfo
        ]
    )


    // const dispatch = useDispatch()
    // const { info } = useSelector( userCrudSelector )
    const info = "" // if redux is integrated - delete this line

    let refList = [
        usernameInput,
        passwordInput,
        confirmPasswordInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Create',
            endpint: 'user/auth/register',
            button_value: 'SIGN UP',
            allowButtonAction: allowButtonAction
        },
        {
            type: 'text',
            name: 'EMAIL',
            ref: usernameInput,
            onChange: usernameValidation,
            validationInfo: usernameValidationInfo
        },
        {
            type: 'password',
            name: 'PASSWORD',
            ref: passwordInput,
            onChange: passwordValidation,
            validationInfo: passwordValidationInfo
        },
        {
            type: 'password',
            name: 'CONFIRM PASSWORD',
            ref: confirmPasswordInput,
            onChange: confirmPasswordValidation,
            validationInfo: confirmPasswordValidationInfo
        }
    ]

    const register = async ( refs ) => {
        let pass = {
            username: refs[0].current.value,
            password: refs[1].current.value
        }
        // dispatch(
        //     userCrudAsyncThunk.fetchRegister(
        //         pass
        //     )
        // )
    }

    return (
        <div>
            <FormGenerator
                inputList={ inputList }
                refList={ refList }
                action={ register }
            />
            <div className='form_info'>
                { info }
            </div>
        </div>
    )

}

export default UserRegisterForm
