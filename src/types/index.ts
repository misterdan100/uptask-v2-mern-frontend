import { z } from 'zod'

/** PROJECTS TYPES */
export const projectSchemas = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),

})

export type Project = z.infer<typeof projectSchemas>

export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>