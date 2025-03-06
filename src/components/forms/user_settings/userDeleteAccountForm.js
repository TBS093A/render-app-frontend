import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import { deleteAccount } from '../../../redux/asyncThunks/userAuthAsyncThunk';
import { selectAuthError, selectAuthLoading } from '../../../redux/slices/userAuthSlice';
import FormGenerator from '../formGenerator';

const UserDeleteAccountForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const deleteConfirmationInput = createRef();
    const [deleteConfirmationValidationInfo, setDeleteConfirmationValidationInfo] = useState("Empty");
    const [allowButtonAction, setAllowButtonAction] = useState(false);

    const deleteConfirmationValidation = (event) => {
        if (event.target.value === "") {
            setDeleteConfirmationValidationInfo("Wpisz 'DELETE' aby potwierdzić usunięcie konta");
        } else if (event.target.value !== "DELETE") {
            setDeleteConfirmationValidationInfo("Wpisz dokładnie 'DELETE' aby potwierdzić usunięcie konta");
        } else {
            setDeleteConfirmationValidationInfo("Success");
        }
    };

    useEffect(() => {
        setAllowButtonAction(deleteConfirmationValidationInfo === "Success");
    }, [deleteConfirmationValidationInfo]);

    const inputList = [
        {
            type: 'info',
            action: 'Delete',
            endpoint: 'User',
            button_value: loading ? 'USUWANIE...' : 'USUŃ KONTO',
            allowButtonAction: allowButtonAction
        },
        {
            type: 'text',
            name: 'POTWIERDŹ USUNIĘCIE',
            ref: deleteConfirmationInput,
            onChange: deleteConfirmationValidation,
            validationInfo: deleteConfirmationValidationInfo,
            placeholder: "Wpisz 'DELETE' aby potwierdzić usunięcie konta"
        }
    ];

    const deleteAccountHandler = async (formData) => {
        try {
            if (formData['POTWIERDŹ USUNIĘCIE'] === 'DELETE') {
                await dispatch(deleteAccount()).unwrap();
                setInfoMessage("Konto zostało usunięte!");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setErrorMessage("Wpisz 'DELETE' aby potwierdzić usunięcie konta");
            }
        } catch (error) {
            setErrorMessage("Wystąpił błąd podczas usuwania konta (" + error.message + ")");
        }
    };

    return (
        <div className='form-container'>
            <FormGenerator
                inputList={inputList}
                action={deleteAccountHandler}
            />
            <div className='form_info'>
                {infoMessage && <div className="success-message">{infoMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default UserDeleteAccountForm; 