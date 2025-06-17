export const DeploymentDirections = {
    NORTH: 'צפון',
    SOUTH: 'דרום',
    EAST: 'מזרח',
    WEST: 'מערב',
} as const;

export type DeploymentDirection = keyof typeof DeploymentDirections;