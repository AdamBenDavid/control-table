import type {DeploymentPoint} from './types';

export const mockDeploymentPoints: DeploymentPoint[] = [
    {
        name: 'צומת גני',
        coordinates: {lat: 123456, lng: 123345},
        division: 'עציון',
        directions: ['NORTH', 'SOUTH', 'EAST', 'WEST'],
        linkedUsersCount: 32,
    },
    {
        name: 'צומת מגוש',
        coordinates: {lat: 123456, lng: 123345},
        division: 'משה',
        directions: ['SOUTH', 'WEST'],
        linkedUsersCount: 20,
    },
    {
        name: 'צומת יעקב',
        coordinates: {lat: 123456, lng: 123345},
        division: 'עציון',
        directions: ['NORTH', 'EAST', 'WEST'],
        linkedUsersCount: 30,
    },
    {
        name: 'צומת הלב',
        coordinates: {lat: 123456, lng: 123345},
        division: 'אפרים',
        directions: ['WEST'],
        linkedUsersCount: 14,
    },
    {
        name: 'צומת החושך',
        coordinates: {lat: 123456, lng: 123345},
        division: 'בנימין',
        directions: ['NORTH', 'EAST', 'WEST'],
        linkedUsersCount: 12,
    },
    {
        name: 'צומת האור',
        coordinates: {lat: 123456, lng: 123345},
        division: 'בנימין',
        directions: ['NORTH', 'EAST', 'WEST'],
        linkedUsersCount: 40,
    },
    {
        name: 'צומת חוויות',
        coordinates: {lat: 123456, lng: 123345},
        division: '417',
        directions: ['SOUTH', 'WEST'],
        linkedUsersCount: 10,
    },
];
