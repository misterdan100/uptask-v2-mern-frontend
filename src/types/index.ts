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
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

/** Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>

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
    manager: z.string(userSchema.pick({_id: true}))
})

export const dashboardProjectSchema = z.array(
    projectSchemas.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

/** TS Types */
export type Project = z.infer<typeof projectSchemas>
export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>

/** Team */

const teamMemberSchema = userSchema.pick({
    _id: true,
    name: true,
    email: true,
})

export const teamMembersSchema = z.array(teamMemberSchema)
export const teamProjecSchema = z.object({
    projectName: z.string(projectSchemas.pick({_id: true})),
    team: teamMembersSchema
})

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember,  'email'>