import React from 'react';
import styles from './styles.module.scss';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {FormControl, MenuItem, Select, InputLabel} from '@material-ui/core';

interface Props {
}

export const DirectionCard: React.FC<Props> = ({}) => {
    const [selectedOption, setSelectedOption] = React.useState('');

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

                <div className={styles.input}>
                    {/* Add input field or custom content here */}
                </div>

                <FormControl variant="standard" className={styles.input}>
                    <InputLabel>בחר אופציה</InputLabel>
                    <Select value={selectedOption} onChange={handleChange}>
                        <MenuItem value="option1">אופציה 1</MenuItem>
                        <MenuItem value="option2">אופציה 2</MenuItem>
                        <MenuItem value="option3">אופציה 3</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.deploymentPointMap}>
                    <span>map preview picture</span>
                </div>
            </div>
        </div>
    );
};
