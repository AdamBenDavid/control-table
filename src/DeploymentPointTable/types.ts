import type {DeploymentDirection} from './directions';

export type DeploymentPoint = {
    id: number;
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    division: string;
    directions: DeploymentDirection[];
    linkedUsersCount: number;
};