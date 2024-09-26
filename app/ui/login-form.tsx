'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useEffect, useState } from 'react';
import { useUser } from '../Hooks/useUser';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
 
export default function LoginForm() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const { loginUser, error } = useUser();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const isAuthenticated = useSelector((state:any) => state.user.user);

    useEffect(() => {
      if (isAuthenticated) {
        router.push('/dashboard');
      }
    }, [isAuthenticated, router]);
  
    useEffect(() => {
      setIsEmailValid(validateEmail(email));
      setIsPasswordValid(validatePassword(password));
    }, [email, password]);
  
    useEffect(() => {
      setIsFormValid(isEmailValid && isPasswordValid);
    }, [isEmailValid, isPasswordValid]);
  
    const validateEmail = (email:string) => {
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
  
    const validatePassword = (password:string) => {
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
  
    const handleSubmit = async (event:any) => {
      event.preventDefault();
      const userData = {
        email: email,
        password: password,
      };
      try {
        setLoading(true);
        const response = await loginUser(userData);
        console.log("res",response)
        if (response.status === "success") {
          console.log("insideee ")
          setLoading(false);
          sessionStorage.setItem("isAuthenticated", "true");
          router.push('/dashboard');

        }
        setLoading(false);
  
      } catch (error) {
        console.error("Error logging in:", error);
        setLoading(false);
      }
    };
 
  return (
    <form  className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-slate-200 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
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
        </div>
        <Button className="mt-4 w-full bg-sky-950"  disabled={!isFormValid}>
          
          {loading? "Loading...":"Log in"} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-5 " />
        </Button>
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
            </strong><br/>
          Email : test@gmail.com,<br/>
          Password : test
          </p>
        
        </div>
        
      </div>
    </form>
  );
}