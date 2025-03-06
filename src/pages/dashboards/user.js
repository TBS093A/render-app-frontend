import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/slices/userAuthSlice';
import UserUpdateProfileForm from '../../components/forms/user_settings/userUpdateProfileForm';
import UserChangePasswordForm from '../../components/forms/user_settings/userChangePasswordForm';
import UserDeleteAccountForm from '../../components/forms/user_settings/userDeleteAccountForm';

const UserSettingsDashboard = () => {
    const user = useSelector(selectCurrentUser);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Panel Użytkownika</h1>
                <div className="user-info">
                    <span>Zalogowany jako: {user?.login}</span>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="user-settings">
                    <div className="settings-section">
                        <h2>Aktualizacja profilu</h2>
                        <UserUpdateProfileForm />
                    </div>

                    <div className="settings-section">
                        <h2>Zmiana hasła</h2>
                        <UserChangePasswordForm />
                    </div>

                    <div className="settings-section">
                        <h2>Usuwanie konta</h2>
                        <UserDeleteAccountForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettingsDashboard;
