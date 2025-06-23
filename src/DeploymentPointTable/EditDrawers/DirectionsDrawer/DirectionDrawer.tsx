import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './styles.module.scss';
import type {DeploymentPoint} from "../../types.ts";
import {BaseDrawer} from "../BaseDrawer/BaseDrawer.tsx";
import {DirectionCard} from "./DirectionCard/DirectionCard.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
    point: DeploymentPoint | null;
    onSave: (updatedPoint: DeploymentPoint) => void;
}


export const DirectionDrawer: React.FC<Props> = ({open, onClose, point}) => {
    // const onSubmit = () => {
    // }

    return (
        <BaseDrawer open={open}
                    onClose={onClose}
                    title={point?.name ? `${point.name} - עריכת נקודת פריסה` : 'עריכת נקודת פריסה'}
                    footer={
                        <div>
                            <Button
                                style={{backgroundColor: '#4B64D7', borderRadius: '30px', color: 'white'}}
                                onClick={() => {
                                }}
                            >
                                שנה ושמור
                            </Button>
                            <Button style={{color: '#4B64D7'}} onClick={onClose}>
                                ביטול
                            </Button>
                        </div>
                    }
        >
            <div className={styles.container}>
                <DirectionCard/>
            </div>
        </BaseDrawer>
    );
};
