import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "@/types";
import { isAxiosError } from 'axios'

type TaskAPI = {
    projectId: Project['_id']
    formData: TaskFormData
    taskId: Task['_id']
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

export async function getTaskById({taskId, projectId}: Pick<TaskAPI, 'taskId' | 'projectId'>) {
    try {
        const { data } = await api(`/projects/${projectId}/tasks/${taskId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        
    }
}

export async function updateTask({projectId, taskId, formData}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectId, taskId}: Pick<TaskAPI,'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}