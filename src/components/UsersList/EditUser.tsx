import React, { useState } from 'react';
import { User } from '../../types';
import styles from './UsersList.module.css';
import { updateUser } from '../../services/usersService';

interface EditUserProps {
    user: User;
    onUpdate: (updatedUser: User) => void;
    onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState<User>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'age' || name === 'phone' ? Number(value) : value,
        });
    };
//handlesubmit para hacer poder hacer debugging
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData._id) {
        console.error('User ID is missing.');
        return;
    }

    try {
        const updatedUser = await updateUser(formData);
        onUpdate(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

    return (
        <div className={styles.editUserContainer}>
            <form onSubmit={handleSubmit} className={styles.editUserForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={onCancel} className={styles.button}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.button}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;