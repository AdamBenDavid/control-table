import React, {useState} from 'react';
import styles from './styles.module.scss';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';

interface Props {
}

export const DirectionCard: React.FC<Props> = ({}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedOption(event.target.value as string);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topRow}>
                <IconButton className={styles.closeButton} size="small" disableRipple>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </div>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>מיקום פריסת הרשד"ג</span>
                </div>
                <FormControl variant="standard" className={styles.formControl}>
                    <InputLabel>בחר אופציה</InputLabel>
                    <Select value={selectedOption}
                            onChange={handleChange}
                            MenuProps={{
                                PaperProps: {
                                    style: {direction: 'rtl'},
                                },
                            }}>
                        <MenuItem value="option1">צפון</MenuItem>
                        <MenuItem value="option2">דרום</MenuItem>
                        <MenuItem value="option3">מזרח</MenuItem>
                        <MenuItem value="option3">מערב</MenuItem>
                    </Select>
                </FormControl>
                <div className={styles.deploymentPointMap}>
                    <span>map preview picture</span>
                </div>
            </div>
        </div>
    );
};
