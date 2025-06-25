import {z} from "zod";

export const DeploymentPointFormSchema = z.object({
    deploymentName: z.string().min(1, 'יש לבחור שם לנקודת פריסה'), lat: z.coerce.number({
        invalid_type_error: 'רוחב צריך להיות מספר חוקי',
    }),
    lng: z.coerce.number({
        invalid_type_error: 'אורך צריך להיות מספר חוקי',
    }),
    division: z.string().min(1, 'יש לבחור חטיבה'),
});

export type DeploymentPointForm = z.infer<typeof DeploymentPointFormSchema>