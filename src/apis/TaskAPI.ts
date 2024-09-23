import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "@/types";
import { isAxiosError } from 'axios'

type TaskAPI = {
    projectId: Project['_id']
    formData: TaskFormData
}

export async function createTask({projectId, formData}: Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}