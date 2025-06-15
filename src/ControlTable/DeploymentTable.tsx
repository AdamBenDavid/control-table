import {
    Table, TableHead, TableRow, TableCell,
    TableBody, IconButton, Tooltip, TableContainer, Paper,
    Typography
} from '@mui/material';
import styles from './styles.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type {DeploymentPoint} from './types';
import {DeploymentDirections} from './directions';
import editIconUrl from './icons/Edit.svg';
import {useState} from "react";


interface Props {
    data: DeploymentPoint[];
    onEdit: (row: DeploymentPoint) => void;
    onDelete: (row: DeploymentPoint) => void;
}

export const DeploymentTable: React.FC<Props> = ({data, onEdit, onDelete}) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing(!isEditing);

    return (
        <TableContainer component={Paper} style={{direction: 'rtl'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography className={styles.title} fontSize='18px' fontWeight='600'>נקודות פריסה</Typography>
                <button className={styles.editButton}
                        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                        onClick={() => toggleEditing()}>
                    <img src={editIconUrl} alt="Edit" className={styles.icon}/>
                    עריכה
                </button>
            </div>
            <Table>
                <TableHead className={styles.header}>
                    <TableRow>
                        <TableCell align="right" style={{fontWeight: '700', color: '#717680'}}>
                            שם נק׳ פריסה</TableCell>
                        <TableCell align="right" style={{fontWeight: '700', color: '#717680'}}>נ.צ</TableCell>
                        <TableCell align="right" style={{fontWeight: '700', color: '#717680'}}>חטיבה</TableCell>
                        <TableCell align="right" style={{fontWeight: '700', color: '#717680'}}>כיוונים
                            ממופים</TableCell>
                        <TableCell align="right" style={{fontWeight: '700', color: '#717680'}}>יוזרים
                            מקושרים</TableCell>
                        {isEditing ?
                            <TableCell align="right">פעולות</TableCell> : ''
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((point, i) => (
                        <TableRow key={i}>

                            <TableCell align={"right"} className={styles.cellWithDivider}>{point.name}</TableCell>
                            <TableCell align={"right"}
                                       className={styles.cellWithDivider}>{`${point.coordinates.lat}/${point.coordinates.lng}`}</TableCell>
                            <TableCell align={"right"} className={styles.cellWithDivider}>{point.division}</TableCell>
                            <TableCell align={"right"}
                                       className={styles.cellWithDivider}>{point.directions.map(d => DeploymentDirections[d]).join('/')}</TableCell>
                            <TableCell align={"right"}
                                       className={styles.cellWithDivider}>{point.linkedUsersCount}</TableCell>
                            {isEditing ?
                                <TableCell align="right">
                                    <Tooltip title="ערוך">
                                        <IconButton onClick={() => onEdit(point)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="מחק">
                                        <IconButton onClick={() => onDelete(point)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                : ''
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
