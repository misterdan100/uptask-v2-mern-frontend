import { z } from 'zod'

/** Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
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
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'password' | 'password_confirmation' | 'current_password'>
export type CheckPasswordForm = Pick<Auth, 'password'>

/** Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string()
})



export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

/** NOTES TYPES */
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/** TASK TYPES */
export const taskStatusSchema = z.enum(["pending" , "onHold", "inProgress", "underReview" , "completed"])
const changeHistorySchema = z.object({
    _id: z.string(),
    change: z.string(), 
    changeBy: userSchema.pick({_id:true, name: true}),
    changeDate: z.string(),
})
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    changeHistory: z.array(changeHistorySchema),
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const taskProjectSchema = taskSchema.pick({_id: true, name: true, description: true, status:true})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskStatus = z.infer<typeof taskStatusSchema>
export type TaskProject = z.infer<typeof taskProjectSchema>

/** PROJECTS TYPES */
export const projectSchemas = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({_id: true})),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userSchema.pick({_id:true})))
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

export const editProjectSchema = projectSchemas.pick({projectName: true, clientName: true, description: true})


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