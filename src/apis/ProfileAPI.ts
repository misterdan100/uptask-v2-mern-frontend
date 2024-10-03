import api from "@/lib/axios";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "@/types";
import { isAxiosError } from "axios";


export async function updateProfile(formdata: UserProfileForm) {
    try {
        const url = `/auth/profile`
        const { data } = await api.put<string>(url, formdata)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateCurrentPasswordProfile(formdata: UpdateCurrentUserPasswordForm) {
    try {
        const url = '/auth/update-password'
        const { data } = await api.post<string>(url, formdata)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}