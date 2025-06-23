import {Drawer} from '@material-ui/core';
import type {DrawerProps} from '@material-ui/core/Drawer';
import styles from './styles.module.scss';
import React from "react";

interface BaseDrawerProps extends DrawerProps {
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    width?: string | number;
    title?: string;
    footer?: React.ReactNode;
}

const DRAWER_DEFAULT_WIDTH = 576;

export const BaseDrawer: React.FC<BaseDrawerProps> = ({
                                                          children,
                                                          anchor = 'right',
                                                          open,
                                                          onClose,
                                                          width = DRAWER_DEFAULT_WIDTH,
                                                          title,
                                                          footer,
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
                {title && <div className={styles.title}>{title}</div>}
                <div className={styles.drawerContent}>{children}</div>
            </div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </Drawer>
    );
};
