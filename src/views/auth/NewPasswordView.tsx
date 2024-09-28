import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { ConfirmToken } from "@/types";
import { useState } from "react";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Reset password
      </h1>
      <p className="mt-5 text-2xl font-light text-white">
        Enter the code you got {""}
        <span className="font-bold text-orange-500"> by e-mail</span>
      </p>

      {!isValidToken ? <NewPasswordToken 
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        /> : <NewPasswordForm 
        token={token}
      />}


    </>
  );
}
