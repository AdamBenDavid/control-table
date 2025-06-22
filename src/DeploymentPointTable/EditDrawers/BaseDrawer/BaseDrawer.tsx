import {Drawer} from '@material-ui/core';
import type {DrawerProps} from '@material-ui/core/Drawer';
import styles from './styles.module.scss';
import React from "react";

interface BaseDrawerProps extends DrawerProps {
    children: React.ReactNode;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    width?: string | number;
}

export const BaseDrawer: React.FC<BaseDrawerProps> = ({
                                                          children,
                                                          anchor = 'left',
                                                          open,
                                                          onClose,
                                                          width = 576,
                                                          ...rest
                                                      }) => {
    return (
        <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
            hideBackdrop
            {...rest}
        >
            <div className={styles.drawer} style={{width}}>
                {children}
            </div>
        </Drawer>
    );
};
