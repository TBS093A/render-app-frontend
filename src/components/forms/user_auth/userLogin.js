import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import { loginUser } from '../../../redux/asyncThunks/userAuthAsyncThunk';
import { selectAuthError, selectAuthLoading, setError } from '../../../redux/slices/userAuthSlice';
import FormGenerator from '../formGenerator';

const UserLogin = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectAuthError);
    const loading = useSelector(selectAuthLoading);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const usernameInput = createRef();
    const passwordInput = createRef();

    const [usernameValidationInfo, setUsernameValidationInfo] = useState("Empty");
    const [passwordValidationInfo, setPasswordValidationInfo] = useState("Empty");

    const [allowButtonAction, setAllowButtonAction] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;

    const usernameValidation = (event) => {
        if (event.target.value === "") {
            setUsernameValidationInfo("Login jest wymagany");
        } else {
            setUsernameValidationInfo("Success");
        }
    };

    const passwordValidation = (event) => {
        if (event.target.value === "") {
            setPasswordValidationInfo("Hasło jest wymagane");
        } else if (!passwordRegex.test(event.target.value)) {
            setPasswordValidationInfo("Hasło nie spełnia wymagań tej witryny");
        } else {
            setPasswordValidationInfo("Success");
        }
    };

    useEffect(() => {
        setAllowButtonAction(
            usernameValidationInfo === "Success" &&
            passwordValidationInfo === "Success"
        );
    }, [
        usernameValidationInfo,
        passwordValidationInfo,
    ]);

    const inputList = [
        {
            type: 'info',
            action: 'Login',
            endpoint: 'auth',
            button_value: loading ? 'LOGOWANIE...' : 'ZALOGUJ',
            allowButtonAction: allowButtonAction
        },
        {
            type: 'text',
            name: 'LOGIN',
            ref: usernameInput,
            onChange: usernameValidation,
            validationInfo: usernameValidationInfo
        },
        {
            type: 'password',
            name: 'HASŁO',
            ref: passwordInput,
            onChange: passwordValidation,
            validationInfo: passwordValidationInfo
        }
    ];

    const login = async (formData) => {
        try {
            const credentials = {
                username: formData.LOGIN,
                password: formData.HASŁO
            };

            await dispatch(loginUser(credentials)).unwrap();
            setInfoMessage("Logowanie zakończone sukcesem!");
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage("Wystąpił błąd podczas logowania (" + error.message + ")");
        }
    };

    return (
        <div className='form-container'>
            <FormGenerator
                inputList={inputList}
                action={login}
            />
            <div className='form_info'>
                {infoMessage && <div className="success-message">{infoMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default UserLogin;
