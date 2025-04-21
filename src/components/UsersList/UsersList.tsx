import React, { useState } from "react";
import { User } from '../../types';
import styles from './UsersList.module.css';
import EditUser from './EditUser';

interface Props {
    users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
    const [editingUser, setEditingUser] = useState<User | null>(null);

const handleEdit = (user: User) => {
    if (!user._id) {
        console.error('User ID is missing.');
        return;
    }
    setEditingUser(user);
};

    const handleUpdate = (updatedUser: User) => {
        setEditingUser(null);
        // Update the user in the list (this should ideally be handled by the parent component)
        users = users.map((user) => (user.name === updatedUser.name ? updatedUser : user));
    };

    const renderList = (): React.ReactNode[] => {
        return users.map((user) => (
            <li key={user.name} className={styles.listItem} onClick={() => handleEdit(user)}>
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                </div>
            </li>
        ));
    };

    return (
        <div>
            {editingUser ? (
                <EditUser
                    user={editingUser}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingUser(null)}
                />
            ) : (
                <ul className={styles.list}>
                    {renderList()}
                </ul>
            )}
        </div>
    );
};

export default UsersList;