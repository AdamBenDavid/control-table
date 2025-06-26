import {faker} from '@faker-js/faker';
import type {DeploymentPoint} from './types';

const possibleDivisions = ['עציון', 'מנשה', 'אפרים', 'בנימין', '417'];
const possibleDirections = ['NORTH', 'SOUTH', 'EAST', 'WEST'];

export function generateMockDeploymentPoints(count: number): DeploymentPoint[] {
    return Array.from({length: count}, (_, index) => {
        const directions = faker.helpers.arrayElements(possibleDirections, faker.number.int({min: 1, max: 4}));

        return {
            id: index + 1,
            name: `צומת ${faker.word.words({count: 1})}`,
            coordinates: {
                lat: Number(faker.location.latitude({min: 31.0, max: 33.0})), // Israel approx.
                lng: Number(faker.location.latitude({min: 34.0, max: 36.0})), // Israel approx.
            },
            division: faker.helpers.arrayElement(possibleDivisions),
            directions,
            linkedUsersCount: faker.number.int({min: 1, max: 50}),
        };
    }) as DeploymentPoint[];
}

export const mockDeploymentPoints = generateMockDeploymentPoints(100);