import React from 'react';
import styles from './styles.module.scss';
import Button from "@material-ui/core/Button";

interface Props {

}


export const DirectionCard: React.FC<Props> = ({}) => {


    return (
        <div className={styles.container}>
            <div className={styles.deleteIcon}>
                <Button>X</Button>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.title}>
                    <span>מיקום פריסת הרשד"ג</span>
                </div>
                <div className={styles.input}>
                    <span>input</span>
                </div>
                <div className={styles.deploymentPointMap}>
                    <span>map preview picture</span>
                </div>
            </div>

        </div>
    );
};
