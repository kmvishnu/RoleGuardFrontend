"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/Hooks/useUser';

const UpdateRole = () => {
  const { users, viewAllUsers, assignRole } = useUser();
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [userRoleMap, setUserRoleMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    viewAllUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const roleMap = users.reduce((acc: { [key: string]: string }, user: any) => {
        acc[user.id] = user.role;
        return acc;
      }, {});
      setUserRoleMap(roleMap);
    }
  }, [users]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    setSelectedRole(userRoleMap[userId]);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleApply = async () => {
    if (!selectedUser || !selectedRole) {
      alert('Please select both user and role');
      return;
    }
    const response: any = await assignRole(Number(selectedUser), selectedRole);
    if (response.status === 'success') {
      alert('User role updated successfully');
      setSelectedUser('');
      setSelectedRole('');
      viewAllUsers();

    } else {
      alert('Failed to update user role');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-bold mb-4">Update User Role</h2>

      <div className="flex space-x-4">
        <div className="flex flex-col">
          <label htmlFor="user-select" className="mb-2">Select User</label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={handleUserChange}
            className="p-2 border rounded"
          >
            <option value="">-- Select User --</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>


        <div className="flex flex-col">
          <label htmlFor="role-select" className="mb-2">Select Role</label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={handleRoleChange}
            className="p-2 border rounded"
          >
            <option value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>

        <button
          onClick={handleApply}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-4 self-end"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default UpdateRole;
