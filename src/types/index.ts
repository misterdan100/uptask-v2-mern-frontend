import { z } from 'zod'

/** TASK TYPES */
export const taskStatusSchema = z.enum(["pending" , "onHold", "inProgress", "underReview" , "completed"])
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
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