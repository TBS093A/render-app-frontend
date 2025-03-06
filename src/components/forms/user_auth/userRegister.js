import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import { registerUser } from '../../../redux/asyncThunks/userAuthAsyncThunk';
import { selectAuthError, selectAuthLoading } from '../../../redux/slices/userAuthSlice';
import FormGenerator from '../formGenerator';

const UserRegister = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectAuthError);
    const loading = useSelector(selectAuthLoading);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const usernameInput = createRef();
    const emailInput = createRef();
    const passwordInput = createRef();
    const confirmPasswordInput = createRef();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;

    const [usernameValidationInfo, setUsernameValidationInfo] = useState("Empty");
    const [emailValidationInfo, setEmailValidationInfo] = useState("Empty");
    const [passwordValidationInfo, setPasswordValidationInfo] = useState("Empty");
    const [confirmPasswordValidationInfo, setConfirmPasswordValidationInfo] = useState("Empty");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [allowButtonAction, setAllowButtonAction] = useState(false);

    const usernameValidation = (event) => {
        if (event.target.value === "") {
            setUsernameValidationInfo("Login jest wymagany");
        } else {
            setUsernameValidationInfo("Success");
        }
    };

    const emailValidation = (event) => {
        if (event.target.value === "") {
            setEmailValidationInfo("Email jest wymagany");
        } else if (!emailRegex.test(event.target.value)) {
            setEmailValidationInfo("Nieprawidłowy format emaila");
        } else {
            setEmailValidationInfo("Success");
        }
    };

    const passwordValidation = (event) => {
        setPassword(event.target.value);

        if (event.target.value === "") {
            setPasswordValidationInfo("Hasło jest wymagane");
        } else if (!passwordRegex.test(event.target.value)) {
            setPasswordValidationInfo("Hasło musi zawierać:\n - Minimum 8 znaków\n - Maksimum 24 znaki\n - Minimum jedną wielką literę\n - Minimum jedną małą literę\n - Minimum jedną cyfrę\n - Minimum jeden znak specjalny");
        } else {
            setPasswordValidationInfo("Success");
        }

        if (event.target.value !== confirmPassword) {
            setConfirmPasswordValidationInfo("Hasła nie są identyczne");
        } else {
            setConfirmPasswordValidationInfo("Success");
        }
    };

    const confirmPasswordValidation = (event) => {
        setConfirmPassword(event.target.value);

        if (event.target.value !== password) {
            setConfirmPasswordValidationInfo("Hasła nie są identyczne");
        } else {
            setConfirmPasswordValidationInfo("Success");
        }
    };

    useEffect(() => {
        setAllowButtonAction(
            usernameValidationInfo === "Success" &&
            emailValidationInfo === "Success" &&
            passwordValidationInfo === "Success" &&
            confirmPasswordValidationInfo === "Success"
        );
    }, [
        usernameValidationInfo,
        emailValidationInfo,
        passwordValidationInfo,
        confirmPasswordValidationInfo
    ]);


    const inputList = [
        {
            type: 'info',
            action: 'Register',
            endpoint: 'auth',
            button_value: loading ? 'REJESTRACJA...' : 'ZAREJESTRUJ',
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
            type: 'text',
            name: 'EMAIL',
            ref: emailInput,
            onChange: emailValidation,
            validationInfo: emailValidationInfo
        },
        {
            type: 'password',
            name: 'HASŁO',
            ref: passwordInput,
            onChange: passwordValidation,
            validationInfo: passwordValidationInfo
        },
        {
            type: 'password',
            name: 'POTWIERDŹ HASŁO',
            ref: confirmPasswordInput,
            onChange: confirmPasswordValidation,
            validationInfo: confirmPasswordValidationInfo
        }
    ];

    const register = async (formData) => {
        try {
            const userData = {
                username: formData.LOGIN,
                email: formData.EMAIL,
                password: formData.HASŁO
            };

            await dispatch(registerUser(userData)).unwrap();
            setInfoMessage("Rejestracja zakończona sukcesem!");
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage("Wystąpił błąd podczas rejestracji (" + error.massage + ")");
        }
    };

    return (
        <div className='form-container'>
            <FormGenerator
                inputList={inputList}
                action={register}
            />
            <div className='form_info'>
                {infoMessage && <div className="success-message">{infoMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default UserRegister;
