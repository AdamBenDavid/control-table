import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
    list: {
        width: 576,
    },
});

interface Props {
    open: boolean;
    onClose: () => void;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
}

export const DeploymentPointDataDrawer: React.FC<Props> = ({open, onClose, anchor = 'left'}) => {
    const classes = useStyles();

    const DrawerList = (
        <div
            className={classes.list}
            role="presentation"
            onClick={onClose}
            onKeyDown={onClose}
        >
           
        </div>
    );

    return (
        <Drawer anchor={anchor} open={open} onClose={onClose}>
            {DrawerList}
        </Drawer>
    );
};
