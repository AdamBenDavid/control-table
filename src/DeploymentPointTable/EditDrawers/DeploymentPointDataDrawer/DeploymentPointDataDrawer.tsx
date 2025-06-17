import React, {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import styles from './styles.module.scss';
import TextField from '@material-ui/core/TextField';
import {FormControl, type InputBaseComponentProps, makeStyles, MenuItem, Select,} from '@material-ui/core';
import {type Division, Divisions} from "../../divisions.ts";

interface Props {
    open: boolean;
    onClose: () => void;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
}

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 250,
        direction: 'rtl',
    },
    select: {
        textAlign: 'right',
    },
    icon: {
        left: 7,
        right: 'auto',
    },
}));

const numericInputProps: InputBaseComponentProps = {
    maxLength: 8,
    style: {fontSize: '14px'},
    inputMode: 'numeric',
    pattern: '[0-9]*',
};

const handleNumericChange = (setter: (val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyDigits = e.target.value.replace(/\D/g, '');
        setter(onlyDigits);
    };

export const DeploymentPointDataDrawer: React.FC<Props> = ({open, onClose, anchor = 'left'}) => {
    const classes = useStyles();
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [division, setDivision] = useState<Division | ''>('');

    const handleDivisionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDivision(event.target.value as Division);
    };

    return (
        <Drawer anchor={anchor} open={open} onClose={onClose} hideBackdrop>
            <div className={styles.drawer}>
                <div className={styles.container}>
                    <span className={styles.title}>עריכת נקודת פריסה - צומת נוי</span>

                    <div className={styles.titleAndInput}>
                        <span className={styles.inputTitle}>שם נקודת פריסה</span>
                        <TextField
                            variant="standard"
                            dir="rtl"
                            inputProps={{style: {fontSize: '14px'}, maxLength: 20}}
                        />
                    </div>

                    <div className={styles.titleAndInput}>
                        <span className={styles.inputTitle}>נ.צ</span>
                        <div className={styles.coordinates}>
                            <span>אורך</span>
                            <TextField
                                variant="standard"
                                dir="rtl"
                                value={lat}
                                onChange={handleNumericChange(setLat)}
                                inputProps={numericInputProps}
                            />
                            <span>/</span>
                            <span>רוחב</span>
                            <TextField
                                variant="standard"
                                dir="rtl"
                                value={lng}
                                onChange={handleNumericChange(setLng)}
                                inputProps={numericInputProps}
                            />
                        </div>
                    </div>

                    <div className={styles.titleAndInput}>
                        <span className={styles.inputTitle}>חטיבה</span>
                        <FormControl variant="standard" className={classes.formControl}>
                            <Select
                                labelId="division-label"
                                id="division-select"
                                value={division}
                                onChange={handleDivisionChange}
                                classes={{
                                    icon: classes.icon,
                                }}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    getContentAnchorEl: null,
                                    PaperProps: {
                                        style: {direction: 'rtl', textAlign: 'right'},
                                    },
                                }}
                            >
                                {Object.values(Divisions).map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className={styles.buttonSection}>
                    <Button style={{backgroundColor: '#4B64D7', borderRadius: '30px', color: 'white'}}>
                        שנה ושמור
                    </Button>
                    <Button style={{color: '#4B64D7'}} onClick={onClose}>
                        ביטול
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};
