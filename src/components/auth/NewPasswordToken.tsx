import { validateToken } from '@/apis/AuthAPI';
import { ConfirmToken } from '@/types';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {
    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })

    const handleChange = (token: ConfirmToken['token']) => {setToken(token)}
    
    const handleComplete = (token: ConfirmToken['token']) => {
        mutate(token)
    }

    return (
        <>
            <form
                className="p-10 mt-10 space-y-8 bg-white rounded-lg"
            >
                <label
                    className="block text-2xl font-normal text-center"
                >6 digit code</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg inputs" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg inputs" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg inputs" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg inputs" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg inputs" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg inputs" />
                    </PinInput>
                </div>
            </form>
            <nav className="flex flex-col mt-10 space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="font-normal text-center text-gray-300"
                >
                    Request a new code
                </Link>
            </nav>
        </>
    )
}