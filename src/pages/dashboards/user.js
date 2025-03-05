import React, { useState, useRef } from 'react';
import FormGenerator from '../../components/forms/formGenerator';

const UserSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const usernameInput = useRef();
    const emailInput = useRef();
    const currentPasswordInput = useRef();
    const newPasswordInput = useRef();
    const confirmPasswordInput = useRef();

    const [usernameValidationInfo, setUsernameValidationInfo] = useState("Empty");
    const [emailValidationInfo, setEmailValidationInfo] = useState("Empty");
    const [currentPasswordValidationInfo, setCurrentPasswordValidationInfo] = useState("Empty");
    const [newPasswordValidationInfo, setNewPasswordValidationInfo] = useState("Empty");
    const [confirmPasswordValidationInfo, setConfirmPasswordValidationInfo] = useState("Empty");

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const usernameValidation = (event) => {
        if (event.target.value === "") {
            setUsernameValidationInfo("Username is required.");
        } else {
            setUsernameValidationInfo("Success");
        }
    };

    const emailValidation = (event) => {
        if (event.target.value === "") {
            setEmailValidationInfo("Email is required.");
        } else if (!emailRegex.test(event.target.value)) {
            setEmailValidationInfo("Please provide correct email");
        } else {
            setEmailValidationInfo("Success");
        }
    };

    const currentPasswordValidation = (event) => {
        if (event.target.value === "") {
            setCurrentPasswordValidationInfo("Current password is required.");
        } else {
            setCurrentPasswordValidationInfo("Success");
        }
    };

    const newPasswordValidation = (event) => {
        if (event.target.value === "") {
            setNewPasswordValidationInfo("New password is required.");
        } else if (!passwordRegex.test(event.target.value)) {
            setNewPasswordValidationInfo("Password require:\n - At least 8 characters,\n - At least one uppercase letter,\n - At least one lowercase letter,\n - At least one digit,\n - At least one special character.");
        } else {
            setNewPasswordValidationInfo("Success");
        }
    };

    const confirmPasswordValidation = (event) => {
        if (event.target.value === "") {
            setConfirmPasswordValidationInfo("Please confirm your new password.");
        } else if (event.target.value !== newPasswordInput.current.value) {
            setConfirmPasswordValidationInfo("Passwords do not match.");
        } else {
            setConfirmPasswordValidationInfo("Success");
        }
    };

    const handleSubmit = async (refs) => {
        try {
            // TODO: Implement API call to update user data
            console.log('Updating user data:', {
                username: refs[0].current.value,
                email: refs[1].current.value,
                currentPassword: refs[2].current.value,
                newPassword: refs[3].current.value
            });
            
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
            setIsEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update settings. Please try again.' });
        }
    };

    const getInputList = () => {
        const baseInputs = [
            {
                type: 'info',
                action: 'Update',
                endpoint: 'user/settings',
                button_value: isEditing ? 'SAVE CHANGES' : ''
            },
            {
                type: 'text',
                name: 'USERNAME',
                ref: usernameInput,
                onChange: usernameValidation,
                validationInfo: usernameValidationInfo,
                disabled: !isEditing
            },
            {
                type: 'text',
                name: 'EMAIL',
                ref: emailInput,
                onChange: emailValidation,
                validationInfo: emailValidationInfo,
                disabled: !isEditing
            }
        ];

        if (isEditing) {
            baseInputs.push(
                {
                    type: 'password',
                    name: 'CURRENT PASSWORD',
                    ref: currentPasswordInput,
                    onChange: currentPasswordValidation,
                    validationInfo: currentPasswordValidationInfo
                },
                {
                    type: 'password',
                    name: 'NEW PASSWORD',
                    ref: newPasswordInput,
                    onChange: newPasswordValidation,
                    validationInfo: newPasswordValidationInfo
                },
                {
                    type: 'password',
                    name: 'CONFIRM NEW PASSWORD',
                    ref: confirmPasswordInput,
                    onChange: confirmPasswordValidation,
                    validationInfo: confirmPasswordValidationInfo
                }
            );
        }

        return baseInputs;
    };

    const formRefs = [usernameInput, emailInput, currentPasswordInput, newPasswordInput, confirmPasswordInput];

    const handleFormAction = (refs) => {
        const formData = {};
        formRefs.forEach((ref, index) => {
            formData[getInputList()[index].name] = ref.current.value;
        });
        handleSubmit(formRefs);
    };

    return (
        <div className="list-container">
            <div className="user-settings">
                <div className="settings-header">
                    <h2>User Settings</h2>
                    <button 
                        className={`edit-button ${isEditing ? 'cancel' : ''}`}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {isEditing && (
                    <div className="form-overlay">
                        <div className="form-container">
                            <FormGenerator
                                inputList={getInputList().map((field, index) => ({
                                    ...field,
                                    ref: formRefs[index],
                                    type: field.type,
                                    name: field.name,
                                    onChange: field.onChange,
                                    validationInfo: field.validationInfo
                                }))}
                                refList={formRefs}
                                action={handleFormAction}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSettings;
