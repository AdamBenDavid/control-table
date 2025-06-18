import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@material-ui/core';
import styles from './styles.module.scss';
import type {DeploymentPoint} from '../types.ts';
import {DeploymentDirections} from '../directions.ts';
import editIcon from '../icons/Edit.svg';
import deleteIcon from '../icons/trash.svg';
import saveButton from '../icons/save.svg';
import arrowButton from '../icons/Arrow.svg';
import {useState} from "react";
import Button from "@material-ui/core/Button";
import {DeploymentPointDataDrawer} from "../EditDrawers/DeploymentPointDataDrawer/DeploymentPointDataDrawer.tsx";

interface Props {
    data: DeploymentPoint[];
    onDelete: (row: DeploymentPoint) => void;
}

export const DeploymentTable: React.FC<Props> = ({data, onDelete}) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing(!isEditing);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<DeploymentPoint | null>(null);
    const [dataState, setDataState] = useState<DeploymentPoint[]>(data);

    const onEdit = (point: DeploymentPoint) => {
        if (isEditing) {
            setSelectedPoint(point);
            setDrawerOpen(true);
        }
    };

    const handlePointUpdate = (updatedPoint: DeploymentPoint) => {
        const newData = dataState.map((p) =>
            p.id === updatedPoint.id ? updatedPoint : p
        );

        setDataState(newData);
        setDrawerOpen(false);
        setSelectedPoint(null);
    };


    return (
        <TableContainer component={Paper} style={{direction: 'rtl'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography className={styles.title} style={{fontSize: '18px', fontWeight: 600}}>
                    נקודות פריסה
                </Typography>
                {isEditing ?
                    <Button style={{
                        borderRadius: '33px',
                        background: '#4B64D7',
                        border: '1px solid #e0e0e0',
                        fontWeight: 'lighter',
                        color: '#ffffff',
                        marginLeft: '24px',
                    }}
                            onClick={toggleEditing}>
                        <img src={saveButton} alt="Edit" className={styles.icon}/>
                        צא ממצב עריכה
                    </Button>
                    :
                    <Button style={{
                        borderRadius: '33px',
                        background: '#ffffff',
                        border: '1px solid #e0e0e0',
                        fontWeight: 'lighter',
                        marginLeft: '24px',
                    }}
                            onClick={toggleEditing}>
                        <img src={editIcon} alt="Edit" className={styles.icon}/>
                        עריכה
                    </Button>
                }
            </div>
            <Table>
                <TableHead className={styles.header}>
                    <TableRow>
                        <TableCell align="right" style={{fontWeight: 700, color: '#717680'}}>שם נק׳ פריסה</TableCell>
                        <TableCell align="right" style={{fontWeight: 700, color: '#717680'}}>נ.צ</TableCell>
                        <TableCell align="right" style={{fontWeight: 700, color: '#717680'}}>חטיבה</TableCell>
                        <TableCell align="right" style={{fontWeight: 700, color: '#717680'}}>כיוונים ממופים</TableCell>
                        <TableCell align="right" style={{fontWeight: 700, color: '#717680'}}>יוזרים מקושרים</TableCell>
                        {isEditing && (
                            <TableCell align="center" style={{fontWeight: 700, color: '#717680'}}>פעולות</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataState.map((point, i) => (
                        <TableRow key={i}>
                            <TableCell align="right"
                                       className={`${styles.cell} ${isEditing ? styles.underlineOnHover : ''} ${styles.cellWithDivider}`}>
                                <div
                                    className={isEditing ? styles.clickableCell : undefined}
                                    onClick={() => onEdit(point)}
                                >
                                    {point.name}
                                </div>
                            </TableCell>
                            <TableCell align="right"
                                       className={`${styles.cell} ${isEditing ? styles.underlineOnHover : ''} ${styles.cellWithDivider}`}>
                                <div
                                    className={isEditing ? styles.clickableCell : undefined}
                                    onClick={() => onEdit(point)}
                                >
                                    {`${point.coordinates.lat}/${point.coordinates.lng}`}
                                </div>
                            </TableCell>
                            <TableCell align="right"
                                       className={`${styles.cell} ${isEditing ? styles.underlineOnHover : ''} ${styles.cellWithDivider}`}>
                                <div
                                    className={isEditing ? styles.clickableCell : undefined}
                                    onClick={() => onEdit(point)}
                                >
                                    {point.division}
                                </div>
                            </TableCell>
                            <TableCell align="right" className={styles.cellWithDivider}>
                                <div className={styles.directionColumn}>
                                    <div className={styles.directionLabel}>
                                        <span className={styles.directionCount}>{point.directions.length}</span>
                                        <span className={styles.directionText}>
                                        {point.directions.map(d => DeploymentDirections[d]).join('/')}
                                     </span>
                                    </div>
                                    <Button onClick={() => {
                                    }}>
                                        <img src={arrowButton} alt="Arrow" className={styles.directionArrowIcon}/>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell align="right"
                                       className={styles.cellWithDivider}>
                                <div className={styles.directionColumn}>
                                    <span className={styles.users}>{point.linkedUsersCount}</span>
                                    <Button onClick={() => {
                                    }}>
                                        <img src={arrowButton} alt="Arrow" className={styles.usersArrowIcon}/>
                                    </Button>
                                </div>
                            </TableCell>
                            {isEditing && (
                                <TableCell align="center">
                                    <Tooltip title="מחק">
                                        <img src={deleteIcon} alt="Delete" className={styles.icon}
                                             onClick={() => onDelete(point)}/>
                                    </Tooltip>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DeploymentPointDataDrawer
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setSelectedPoint(null);
                }}
                anchor="left"
                point={selectedPoint}
                onSave={handlePointUpdate}
            />
        </TableContainer>
    );
};
