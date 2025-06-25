import classes from './management-page.module.scss';
import {DeploymentPointsManagementTable} from '../DeploymentPointTable/Table/DeploymentPointsManagementTable.tsx';
import {useState} from 'react';
import {
    DeploymentPointDataDrawer
} from '../DeploymentPointTable/EditDrawers/DeploymentPointDataDrawer/DeploymentPointDataDrawer.tsx';
import type {DeploymentPoint} from '../DeploymentPointTable/types.ts';
import {Input} from "@material-ui/core";

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

    const [search, setSearch] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div className={classes.managementPage}>
            <div className={classes.tableSection}>
                <Input className={classes.searchInput} onChange={handleSearchChange} value={search}
                       placeholder='חפש נקודות פריסה'/>
                <DeploymentPointsManagementTable
                    onDelete={() => {
                    }}
                    setIsEditing={setIsEditing}
                    onEdit={onEdit}
                    isEditing={isEditing}
                    search={search}
                />
            </div>
            {selectedPoint && <DeploymentPointDataDrawer
                open={drawerOpen}
                point={selectedPoint}
                onClose={() => {
                    setDrawerOpen(false);
                    setSelectedPoint(null);
                }}
                onSave={() => {
                    setDrawerOpen(false);
                    setSelectedPoint(null);
                }}
            />}
        </div>
    );
};
