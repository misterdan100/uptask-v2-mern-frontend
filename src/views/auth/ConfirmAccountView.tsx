import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react";
import { ConfirmToken } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { confirmToken } from "@/apis/AuthAPI";
import { toast } from "react-toastify";


export default function ConfirmAccountView() {
    const navigate = useNavigate()
    const [token, setToken] = useState<ConfirmToken['token']>('')

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const {mutate} = useMutation({
        mutationFn: confirmToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setToken('')
            navigate('/auth/login')
        }
    })
    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({token})
    }


  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirm your account</h1>
      <p className="mt-5 text-2xl font-light text-white">
        Enter the code you received {''}
        <span className="font-bold text-fuchsia-500"> by e-mail</span>
      </p>
      <form
        className="p-10 mt-10 space-y-8 bg-white rounded-2xl"
      >
        <label
          className="block text-2xl font-normal text-center"
        >6 digit code</label>
        <div className="flex justify-center gap-3">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-12 h-12 p-3 text-center placeholder-white border border-gray-300 rounded-lg"/>
                <PinInputField className="w-12 h-12 p-3 text-center placeholder-white border border-gray-300 rounded-lg"/>
                <PinInputField className="w-12 h-12 p-3 text-center placeholder-white border border-gray-300 rounded-lg"/>
                <PinInputField className="w-12 h-12 p-3 text-center placeholder-white border border-gray-300 rounded-lg"/>
                <PinInputField className="w-12 h-12 p-3 text-center placeholder-white border border-gray-300 rounded-lg"/>
                <PinInputField className="w-12 h-12 p-3 text-center placeholder-white border border-gray-300 rounded-lg"/>
            </PinInput>
        </div>

      </form>

      <nav className="flex flex-col mt-10 space-y-4">
        <Link
          to='/auth/request-code'
          className="font-normal text-center text-gray-300 hover:text-gray-200"
        >
          Request a new code
        </Link>
        <Link
          to='/auth/register'
          className="font-normal text-center text-gray-300 hover:text-gray-200"
        >
          Don't you have an account? Create one
        </Link>
      </nav>

    </>
  )
}