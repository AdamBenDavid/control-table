import React from 'react';
import type {DeploymentPoint} from './types';

interface Props {
    point: DeploymentPoint;
}

const DeploymentRow: React.FC<Props> = ({point}) => {
    const formatCoordinates = () => `${point.coordinates.lat}/${point.coordinates.lng}`;
    const formatDirections = () => point.directions.join('/');

    return (
        <tr>
            <td>{point.name}</td>
            <td>{formatCoordinates()}</td>
            <td>{point.division}</td>
            <td>{formatDirections()}</td>
            <td>{point.linkedUsersCount}</td>
        </tr>
    );
};

export default DeploymentRow;
