import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import styles from './styles.module.scss';
import TextField from '@material-ui/core/TextField';
import {FormControl, type InputBaseComponentProps, MenuItem, Select,} from '@material-ui/core';
import {type Division, Divisions} from "../../divisions.ts";
import type {DeploymentPoint} from "../../types.ts";

interface Props {
    open: boolean;
    onClose: () => void;
    point: DeploymentPoint | null;
    onSave: (updatedPoint: DeploymentPoint) => void;

    anchor?: 'left' | 'right' | 'top' | 'bottom';
}

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

export const DeploymentPointDataDrawer: React.FC<Props> = ({open, onClose, point, onSave, anchor = 'left'}) => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [division, setDivision] = useState<Division | ''>('');
    const [deploymentName, setDeploymentName] = useState('');

    const [errors, setErrors] = useState({
        deploymentName: false,
        lat: false,
        lng: false,
        division: false,
    });


    const handleDivisionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDivision(event.target.value as Division);
    };

    const handleSave = () => {
        const newErrors = {
            deploymentName: deploymentName.trim() === '',
            lat: lat.length < 8,
            lng: lng.length < 8,
            division: division === '',
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (!hasErrors && point) {
            const updatedPoint: DeploymentPoint = {
                ...point,
                name: deploymentName,
                coordinates: {
                    lat: Number(lat),
                    lng: Number(lng),
                },
                division,
            };

            onSave(updatedPoint);
        }
    };

    useEffect(() => {
        if (point) {
            setDeploymentName(point.name);
            setLat(point.coordinates.lat.toString());
            setLng(point.coordinates.lng.toString());
            setDivision(point.division as Division);
        }
    }, [point]);

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
                            value={deploymentName}
                            onChange={(e) => setDeploymentName(e.target.value)}
                            inputProps={{style: {fontSize: '14px'}, maxLength: 20}}
                            error={errors.deploymentName}
                            helperText={errors.deploymentName && 'יש לבחור שם לנקודת פריסה'}
                            FormHelperTextProps={{style: {textAlign: 'right'}}}
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
                                error={errors.lat}
                                helperText={errors.lat && 'יש להזין לפחות 8 ספרות'}
                                FormHelperTextProps={{style: {textAlign: 'right'}}}
                            />
                            <span>/</span>
                            <span>רוחב</span>
                            <TextField
                                variant="standard"
                                dir="rtl"
                                value={lng}
                                onChange={handleNumericChange(setLng)}
                                inputProps={numericInputProps}
                                error={errors.lng}
                                helperText={errors.lng && 'יש להזין לפחות 8 ספרות'}
                                FormHelperTextProps={{style: {textAlign: 'right'}}}
                            />
                        </div>
                    </div>

                    <div className={styles.titleAndInput}>
                        <span className={styles.inputTitle}>חטיבה</span>
                        <FormControl
                            variant="standard"
                            className={styles.formControl}
                            error={errors.division}
                        >
                            <Select
                                value={division}
                                onChange={handleDivisionChange}
                                classes={{
                                    icon: styles.selectIcon, // use the class from SCSS
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            direction: 'rtl',
                                            textAlign: 'right',
                                        },
                                    },
                                }}
                            >
                                {Object.values(Divisions).map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.division && (
                                <span className={styles.divisionErrorText}>
                                 יש לבחור חטיבה
                                </span>
                            )}
                        </FormControl>
                    </div>
                </div>

                <div className={styles.buttonSection}>
                    <Button
                        style={{backgroundColor: '#4B64D7', borderRadius: '30px', color: 'white'}}
                        onClick={handleSave}
                    >
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
