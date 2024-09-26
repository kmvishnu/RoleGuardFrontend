"use client";
import { useEffect } from "react";
import { useUser } from "@/app/Hooks/useUser";

export default function InvoicesTable() {
    const { users, viewAllUsers } = useUser();

    useEffect(() => {
        viewAllUsers();

    },[viewAllUsers] );        
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {users.length > 0 ? (
                            users.map((user: any) => (
                                <div
                                    key={user.id}
                                    className="mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                <div className="text-[20px] font-bold bg-sky-950 text-gray-100 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <p className="ml-2">{user.name}</p>
                                            </div>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <div>
                                        <p className="text-sm text-gray-500">{user.role}</p>
                                            </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Customer
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users.length > 0 ? (
                                users.map((user: any) => (
                                    <tr
                                        key={user.id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                            <div className="text-[20px] font-bold bg-sky-950 text-gray-100 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <p>{user.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {user.email}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                           {user.role}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-3">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
