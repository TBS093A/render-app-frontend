import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../redux/asyncThunks/userAuthAsyncThunk';
import { selectAuthError, selectAuthLoading, selectCurrentUser } from '../../../redux/slices/userAuthSlice';
import FormGenerator from '../formGenerator';

const UserUpdateProfileForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const emailInput = createRef();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [emailValidationInfo, setEmailValidationInfo] = useState("Empty");
    const [allowButtonAction, setAllowButtonAction] = useState(false);

    const emailValidation = (event) => {
        if (event.target.value === "") {
            setEmailValidationInfo("Email jest wymagany");
        } else if (!emailRegex.test(event.target.value)) {
            setEmailValidationInfo("Nieprawidłowy format emaila");
        } else {
            setEmailValidationInfo("Success");
        }
    };

    useEffect(() => {
        setAllowButtonAction(emailValidationInfo === "Success");
    }, [emailValidationInfo]);

    const inputList = [
        {
            type: 'info',
            action: 'Update',
            endpoint: 'User',
            button_value: loading ? 'AKTUALIZACJA...' : 'AKTUALIZUJ',
            allowButtonAction: allowButtonAction
        },
        {
            type: 'label',
            name: 'LOGIN',
            value: user?.login || ''
        },
        {
            type: 'text',
            name: 'EMAIL',
            ref: emailInput,
            onChange: emailValidation,
            validationInfo: emailValidationInfo,
            value: user?.email || ''
        }
    ];

    const update = async (formData) => {
        try {
            const userData = {
                email: formData.EMAIL
            };

            await dispatch(updateProfile(userData)).unwrap();
            setInfoMessage("Profil został zaktualizowany!");
        } catch (error) {
            setErrorMessage("Wystąpił błąd podczas aktualizacji (" + error.message + ")");
        }
    };

    return (
        <div className='form-container'>
            <FormGenerator
                inputList={inputList}
                action={update}
            />
            <div className='form_info'>
                {infoMessage && <div className="success-message">{infoMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default UserUpdateProfileForm; 