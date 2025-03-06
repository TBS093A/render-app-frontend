import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../redux/asyncThunks/userAuthAsyncThunk';
import { selectAuthError, selectAuthLoading } from '../../../redux/slices/userAuthSlice';
import FormGenerator from '../formGenerator';

const UserChangePasswordForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const currentPasswordInput = createRef();
    const newPasswordInput = createRef();
    const confirmPasswordInput = createRef();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;

    const [currentPasswordValidationInfo, setCurrentPasswordValidationInfo] = useState("Empty");
    const [newPasswordValidationInfo, setNewPasswordValidationInfo] = useState("Empty");
    const [confirmPasswordValidationInfo, setConfirmPasswordValidationInfo] = useState("Empty");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [allowButtonAction, setAllowButtonAction] = useState(false);

    const currentPasswordValidation = (event) => {
        if (event.target.value === "") {
            setCurrentPasswordValidationInfo("Hasło jest wymagane");
        } else if (event.target.value === newPassword) {
            setCurrentPasswordValidationInfo("Nowe hasło nie może być takie samo jak aktualne");
        } else {
            setCurrentPasswordValidationInfo("Success");
        }
    };

    const newPasswordValidation = (event) => {
        setNewPassword(event.target.value);

        if (event.target.value === "") {
            setNewPasswordValidationInfo("Hasło jest wymagane");
        } else if (!passwordRegex.test(event.target.value)) {
            setNewPasswordValidationInfo("Hasło musi zawierać:\n - Minimum 8 znaków\n - Maksimum 24 znaki\n - Minimum jedną wielką literę\n - Minimum jedną małą literę\n - Minimum jedną cyfrę\n - Minimum jeden znak specjalny");
        } else {
            setNewPasswordValidationInfo("Success");
        }

        if (event.target.value !== confirmPassword) {
            setConfirmPasswordValidationInfo("Hasła nie są identyczne");
        } else {
            setConfirmPasswordValidationInfo("Success");
        }
    };

    const confirmPasswordValidation = (event) => {
        setConfirmPassword(event.target.value);

        if (event.target.value !== newPassword) {
            setConfirmPasswordValidationInfo("Hasła nie są identyczne");
        } else {
            setConfirmPasswordValidationInfo("Success");
        }
    };

    useEffect(() => {
        setAllowButtonAction(
            currentPasswordValidationInfo === "Success" &&
            newPasswordValidationInfo === "Success" &&
            confirmPasswordValidationInfo === "Success"
        );
    }, [
        currentPasswordValidationInfo,
        newPasswordValidationInfo,
        confirmPasswordValidationInfo
    ]);

    const inputList = [
        {
            type: 'info',
            action: 'Update',
            endpoint: 'User',
            button_value: loading ? 'AKTUALIZACJA...' : 'AKTUALIZUJ',
            allowButtonAction: allowButtonAction
        },
        {
            type: 'password',
            name: 'AKTUALNE HASŁO',
            ref: currentPasswordInput,
            onChange: currentPasswordValidation,
            validationInfo: currentPasswordValidationInfo
        },
        {
            type: 'password',
            name: 'NOWE HASŁO',
            ref: newPasswordInput,
            onChange: newPasswordValidation,
            validationInfo: newPasswordValidationInfo
        },
        {
            type: 'password',
            name: 'POTWIERDŹ NOWE HASŁO',
            ref: confirmPasswordInput,
            onChange: confirmPasswordValidation,
            validationInfo: confirmPasswordValidationInfo
        }
    ];

    const update = async (formData) => {
        try {
            const userData = {
                currentPassword: formData['AKTUALNE HASŁO'],
                newPassword: formData['NOWE HASŁO']
            };

            await dispatch(changePassword(userData)).unwrap();
            setInfoMessage("Hasło zostało zmienione!");
        } catch (error) {
            setErrorMessage("Wystąpił błąd podczas zmiany hasła (" + error.message + ")");
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

export default UserChangePasswordForm; 