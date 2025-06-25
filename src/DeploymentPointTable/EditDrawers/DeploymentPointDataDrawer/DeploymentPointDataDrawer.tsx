import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import TextField from '@material-ui/core/TextField';
import {FormControl, type InputBaseComponentProps, MenuItem, Select} from '@material-ui/core';
import {type Division, Divisions} from '../../divisions';
import {type DeploymentPoint} from '../../types';
import {Controller, useForm} from 'react-hook-form';
import {BaseDrawer} from '../BaseDrawer/BaseDrawer';
import {zodResolver} from '@hookform/resolvers/zod';
import {type DeploymentPointForm, DeploymentPointFormSchema} from "./form.types.ts";

interface Props {
    open: boolean;
    onClose: () => void;
    point: DeploymentPoint | null;
    onSave: (updatedPoint: DeploymentPoint) => void;
}

const numericInputProps: InputBaseComponentProps = {
    maxLength: 8,
    style: {fontSize: '14px'},
    inputMode: 'numeric',
    pattern: '[0-9]*',
};

const handleNumericChange =
    (onChange: (val: string) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const onlyDigits = e.target.value.replace(/\D/g, '');
            onChange(onlyDigits);
        };


export const DeploymentPointDataDrawer: React.FC<Props> = ({
                                                               open,
                                                               onClose,
                                                               point,
                                                               onSave,
                                                           }) => {
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<DeploymentPointForm>({
        resolver: zodResolver(DeploymentPointFormSchema),
        defaultValues: {
            deploymentName: '',
            lat: '',
            lng: '',
            division: '',
        },
    });

    const onSubmit = (data: DeploymentPointForm) => {
        if (!point) return;
        const updatedPoint: DeploymentPoint = {
            ...point,
            name: data.deploymentName,
            coordinates: {
                lat: Number(data.lat),
                lng: Number(data.lng),
            },
            division: data.division as Division,
        };
        onSave(updatedPoint);
    };

    useEffect(() => {
        if (point) {
            reset({
                deploymentName: point.name,
                lat: point.coordinates.lat.toString(),
                lng: point.coordinates.lng.toString(),
                division: point.division,
            });
        }
    }, [point, reset]);

    return (
        <BaseDrawer
            open={open}
            onClose={onClose}
            title={point ? `${point.name} - עריכת נקודת פריסה` : 'עריכת נקודת פריסה'}
            confirmButtonProps={{
                label: 'שנה ושמור',
                onClick: handleSubmit(onSubmit),
            }}
            cancelButtonProps={{
                label: 'ביטול',
                onClick: onClose,
            }}
        >
            <div className={styles.container}>
                {/* Name */}
                <div className={styles.titleAndInput}>
                    <span className={styles.inputTitle}>שם נקודת פריסה</span>
                    <Controller
                        name="deploymentName"
                        control={control}
                        render={({field}) => (
                            <TextField
                                variant="standard"
                                dir="rtl"
                                {...field}
                                inputProps={{style: {fontSize: '14px'}, maxLength: 20}}
                                error={!!errors.deploymentName}
                                helperText={errors.deploymentName?.message}
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
                            render={({field}) => (
                                <TextField
                                    variant="standard"
                                    dir="rtl"
                                    value={field.value}
                                    onChange={handleNumericChange(field.onChange)}
                                    inputProps={numericInputProps}
                                    error={!!errors.lat}
                                    helperText={errors.lat?.message}
                                />
                            )}
                        />
                        <span>/</span>
                        <span>רוחב</span>
                        <Controller
                            name="lng"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    variant="standard"
                                    dir="rtl"
                                    value={field.value}
                                    onChange={handleNumericChange(field.onChange)}
                                    inputProps={numericInputProps}
                                    error={!!errors.lng}
                                    helperText={errors.lng?.message}
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
                                        PaperProps: {style: {direction: 'rtl'}},
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
                    {errors.division.message}
                  </span>
                                )}
                            </FormControl>
                        )}
                    />
                </div>
            </div>
        </BaseDrawer>
    );
};
