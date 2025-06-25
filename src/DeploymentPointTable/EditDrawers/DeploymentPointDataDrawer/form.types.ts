import {z} from "zod";

export const DeploymentPointFormSchema = z.object({
    deploymentName: z.string().min(1, 'יש לבחור שם לנקודת פריסה'),
    lat: z.string().min(8, 'יש להזין לפחות 8 ספרות'),
    lng: z.string().min(8, 'יש להזין לפחות 8 ספרות'),
    division: z.string().min(1, 'יש לבחור חטיבה'),
});

export type DeploymentPointForm = z.infer<typeof DeploymentPointFormSchema>