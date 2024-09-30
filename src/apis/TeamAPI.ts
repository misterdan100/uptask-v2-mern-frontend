import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm } from "@/types";

export const findUserByEmail = async ({projectId, formData} : {projectId: Project['_id'], formData: TeamMemberForm}) => {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const addUserByEmail = async ({projectId, userId}: {projectId: Project['_id'], userId: TeamMember['_id']}) => {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post(url, {id: userId})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
    
}