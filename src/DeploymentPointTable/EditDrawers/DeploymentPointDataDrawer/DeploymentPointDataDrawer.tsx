import React, {useEffect} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import styles from './styles.module.scss';
import TextField from '@material-ui/core/TextField';
import {FormControl, type InputBaseComponentProps, MenuItem, Select,} from '@material-ui/core';
import {type Division, Divisions} from "../../divisions.ts";
import type {DeploymentPoint} from "../../types.ts";
import {Controller, useForm} from 'react-hook-form';

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

const handleNumericChange = (onChange: (val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyDigits = e.target.value.replace(/\D/g, '');
        onChange(onlyDigits);
    };

type FormData = {
    deploymentName: string;
    lat: string;
    lng: string;
    division: Division | '';
}

export const DeploymentPointDataDrawer: React.FC<Props> = ({open, onClose, point, onSave, anchor = 'left'}) => {
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormData>({
        defaultValues: {
            deploymentName: '',
            lat: '',
            lng: '',
            division: '',
        },
    });

    const onSubmit = (data: FormData) => {
        if (!point) return;
        const updatedPoint: DeploymentPoint = {
            ...point,
            name: data.deploymentName,
            coordinates: {
                lat: Number(data.lat),
                lng: Number(data.lng),
            },
            division: data.division,
        };
        onSave(updatedPoint);
    };

    useEffect(() => {
        if (point) {
            reset({
                deploymentName: point.name,
                lat: point.coordinates.lat.toString(),
                lng: point.coordinates.lng.toString(),
                division: point.division as Division,
            });
        }
    }, [point, reset]);

    return (
        <Drawer anchor={anchor} open={open} onClose={onClose} hideBackdrop>
            <div className={styles.drawer}>
                <div className={styles.container}>
                <span className={styles.title}>
                    {point?.name} - עריכת נקודת פריסה
                </span>
                    <div className={styles.titleAndInput}>
                        <span className={styles.inputTitle}>שם נקודת פריסה</span>
                        <Controller
                            name="deploymentName"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <TextField
                                    variant="standard"
                                    dir="rtl"
                                    {...field}
                                    inputProps={{style: {fontSize: '14px'}, maxLength: 20}}
                                    error={!!errors.deploymentName}
                                    helperText={errors.deploymentName && 'יש לבחור שם לנקודת פריסה'}
                                    FormHelperTextProps={{style: {textAlign: 'right'}}}
                                />
                            )}
                        />
                    </div>
                    <div className={styles.titleAndInput}>
                        <span className={styles.inputTitle}>נ.צ</span>
                        <div className={styles.coordinates}>
                            <span>אורך</span>
                            <Controller
                                name="lat"
                                control={control}
                                rules={{required: true, minLength: 8}}
                                render={({field}) => (
                                    <TextField
                                        variant="standard"
                                        dir="rtl"
                                        value={field.value}
                                        onChange={handleNumericChange(field.onChange)}
                                        inputProps={numericInputProps}
                                        error={!!errors.lat}
                                        helperText={errors.lat && 'יש להזין לפחות 8 ספרות'}
                                        FormHelperTextProps={{style: {textAlign: 'right'}}}
                                    />
                                )}
                            />
                            <span>/</span>
                            <span>רוחב</span>
                            <Controller
                                name="lng"
                                control={control}
                                rules={{required: true, minLength: 8}}
                                render={({field}) => (
                                    <TextField
                                        variant="standard"
                                        dir="rtl"
                                        value={field.value}
                                        onChange={handleNumericChange(field.onChange)}
                                        inputProps={numericInputProps}
                                        error={!!errors.lng}
                                        helperText={errors.lng && 'יש להזין לפחות 8 ספרות'}
                                        FormHelperTextProps={{style: {textAlign: 'right'}}}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className={styles.titleAndInput}>
                        <span className={styles.inputTitle}>חטיבה</span>
                        <Controller
                            name="division"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl
                                    variant="standard"
                                    className={styles.formControl}
                                    error={!!errors.division}
                                >
                                    <Select
                                        {...field}
                                        classes={{icon: styles.selectIcon}}
                                        MenuProps={{
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
                                    {errors.division && (
                                        <span className={styles.divisionErrorText}>יש לבחור חטיבה</span>
                                    )}
                                </FormControl>
                            )}
                        />
                    </div>
                </div>
                <div className={styles.buttonSection}>
                    <Button
                        style={{backgroundColor: '#4B64D7', borderRadius: '30px', color: 'white'}}
                        onClick={handleSubmit(onSubmit)}
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
