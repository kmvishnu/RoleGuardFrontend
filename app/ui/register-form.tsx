'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '../Hooks/useUser';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function RegisterForm() {


    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const [name, setName] = useState("");
    const [isNameValid, setIsNameValid] = useState(false);
    const [nameError, setNameError] = useState("");
    const [nameTouched, setNameTouched] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);

    const { signUpUser, error } = useUser();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const isAuthenticated = useSelector((state: any) => state.user.user);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);



    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email is required");
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validatePassword = (password: string) => {
        if (!password) {
            setPasswordError("Password is required");
            return false;
        } else if (password.length <= 3 || password.length >= 20) {
            setPasswordError("Password must be between 4 and 20 characters");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const validateName = (name: string) => {
        if (!name) {
            setNameError("Name is required");
            return false;
        } else if (name.length <= 1 || name.length >= 30) {
            setNameError("Name must be between 2 and 30 characters");
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const validateConfirmPassword = useCallback(
        (confirmPassword: string) => {
            if (!confirmPassword) {
                setConfirmPasswordError("Confirm Password is required");
                return false;
            } else if (confirmPassword !== password) {
                setConfirmPasswordError("Passwords are not matching");
                return false;
            } else {
                setConfirmPasswordError("");
                return true;
            }
        },
        [password] // Dependency on password
    );

    useEffect(() => {
        setIsEmailValid(validateEmail(email));
        setIsPasswordValid(validatePassword(password));
        setIsConfirmPasswordValid(validateConfirmPassword(confirmPassword));
        setIsNameValid(validateName(name));
    }, [email, password, name, confirmPassword, validateConfirmPassword]);

    useEffect(() => {
        setIsFormValid(
            isEmailValid && isPasswordValid && isNameValid && isConfirmPasswordValid
        );
    }, [isEmailValid, isPasswordValid, isNameValid, isConfirmPasswordValid]);


    // const handleSubmit = async (event: any) => {
    //     event.preventDefault();
    //     const userData = {
    //         name: name,
    //         email: email,
    //         password: password,
    //         confirmPassword: confirmPassword,
    //     };
    //     try {
    //         setLoading(true);
    //         const response = await signUpUser(userData);
    //         if (response.status === "success") {
    //             setIsSignupSuccess(true);
    //             setLoading(false);
    //             sessionStorage.setItem("isAuthenticated", "true");
    //             router.push('/login');

    //         }
    //         setLoading(false);

    //     } catch (error) {
    //         console.error("Error signing up", error);
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const userData = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };
        try {
            setLoading(true);
            const response = await signUpUser(userData);
    
            if (response.status === "success") {
                setIsSignupSuccess(true);  // Show the success message
    
                // Set a timer for 3 seconds before redirecting
                setTimeout(() => {
                    setLoading(false);
                    sessionStorage.setItem("isAuthenticated", "true");
                    router.push('/login');
                }, 3000); // 3 seconds delay
            } else {
                setLoading(false);  // If not success, just stop loading
            }
        } catch (error) {
            console.error("Error signing up", error);
            setLoading(false); // Stop loading on error
        }
    };

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex-1 rounded-lg bg-slate-200 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Sign Up.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="name"
                                type="name"
                                name="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setNameTouched(true)}
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                        </div>
                        {nameTouched && nameError && (
                            <p className={`${lusitana.className} text-xs text-red-600 md:text-xs p-2`}>{nameError}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setEmailTouched(true)}
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                        </div>
                        {emailTouched && emailError && (
                            <p className={`${lusitana.className} text-xs text-red-600 md:text-xs p-2`}>{emailError}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setPasswordTouched(true)}
                                required
                                minLength={4}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                        </div>
                        {passwordTouched && passwordError && (
                            <p className={`${lusitana.className} text-xs text-red-600 md:text-xs md:leading-normal p-2`}>{passwordError}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Enter confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() => setConfirmPasswordTouched(true)}
                                required
                                minLength={4}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                        </div>
                        {confirmPasswordTouched && confirmPasswordError && (
                            <p className={`${lusitana.className} text-xs text-red-600 md:text-xs md:leading-normal p-2`}>{confirmPasswordError}</p>
                        )}
                    </div>
                </div>

                {isSignupSuccess && (
                    <div className="p-3 text-green-600 text-center">
                        Registration successful! Redirecting to login...
                    </div>
                )}
                <Button className="mt-4 w-full bg-sky-950" disabled={!isFormValid}>

                    {loading ? "Loading..." : "Sign Up"} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-5 " />
                </Button>
                <Link
                    href="/login"
                    className="flex items-center text-xs text-gray-2 transition-colors p-2 hover:text-blue-400 md:text-base "
                >
                    <span>Already a User ? Sign In</span> <ArrowRightIcon className="w-5 md:w-6" />
                </Link>
                <div
                    className="flex p-1.5 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >

                    {error && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{error}</p>
                        </>
                    )}
                </div>

                <div>
                    <p
                        className={`${lusitana.className} text-l text-gray-500 md:text-l md:leading-normal p-2`}
                    >
                        <strong>* Use Credentials :
                        </strong><br />
                        Email : test@gmail.com,<br />
                        Password : test
                    </p>

                </div>

            </div>
        </form>
    );
}