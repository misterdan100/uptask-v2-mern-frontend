import { z } from 'zod'

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

export type Project = z.infer<typeof projectSchemas>
export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>