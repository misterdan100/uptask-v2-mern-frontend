import { z } from 'zod'

/** Auth & Users */


const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ConfirmToken = Pick<Auth, 'token'>

/** TASK TYPES */
export const taskStatusSchema = z.enum(["pending" , "onHold", "inProgress", "underReview" , "completed"])
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
})
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

/** PROJECTS TYPES */
export const projectSchemas = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),

})

export const dashboardProjectSchema = z.array(
    projectSchemas.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
    })
)

/** TS Types */
export type Project = z.infer<typeof projectSchemas>
export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>