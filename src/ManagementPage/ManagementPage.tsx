import classes from './management-page.module.scss';
import {DeploymentPointsManagementTable} from '../DeploymentPointTable/Table/DeploymentPointsManagementTable.tsx';
import {useState} from 'react';
import {
  DeploymentPointDataDrawer
} from '../DeploymentPointTable/EditDrawers/DeploymentPointDataDrawer/DeploymentPointDataDrawer.tsx';
import type {DeploymentPoint} from '../DeploymentPointTable/types.ts';
import {mockDeploymentPoints} from "../DeploymentPointTable/mockData.ts";

export interface ManagementPageProps {
}

export const ManagementPage = ({}: ManagementPageProps) => {
  const [selectedPoint, setSelectedPoint] = useState<DeploymentPoint | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = (point: DeploymentPoint) => {
    if (isEditing) {
      setSelectedPoint(point);
      setDrawerOpen(true);
    }
  };

//   const { data: deploymentPoints } = useQuery({queryKey: ['deployment-points'],
//     queryFn: async () => {
//       return mockDeploymentPoints
//     },
// initialData: mockDeploymentPoints,
// })


  return (
      <div className={classes.managementPage}>
        <DeploymentPointsManagementTable
            data={mockDeploymentPoints}
            onDelete={() => {
            }}
            setIsEditing={setIsEditing}
            onEdit={onEdit}
            isEditing={isEditing}
        />
        <DeploymentPointDataDrawer
            open={drawerOpen}
            anchor='left'
            point={selectedPoint}
            onClose={() => {
              setDrawerOpen(false);
              setSelectedPoint(null);
            }}
            onSave={() => {
              setDrawerOpen(false);
              setSelectedPoint(null);
            }}
        />
      </div>
  );
};
