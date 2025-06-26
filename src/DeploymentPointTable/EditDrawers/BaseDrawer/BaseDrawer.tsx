import {Drawer} from '@material-ui/core';
import type {DrawerProps} from '@material-ui/core/Drawer';
import styles from './styles.module.scss';
import React from "react";
import clsx from "clsx";

interface BaseDrawerProps extends DrawerProps {
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    width?: string | number;
    title?: string;
    footer?: React.ReactNode;

    confirmButtonProps?: {
        label?: string;
        onClick?: () => void;
        className?: string;
    };

    cancelButtonProps?: {
        label?: string;
        onClick?: () => void;
        className?: string;
    };
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
                                                          cancelButtonProps,
                                                          confirmButtonProps,
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
            {footer ? (
                <div className={styles.footer}>{footer}</div>
            ) : (confirmButtonProps || cancelButtonProps) ? (
                <div className={styles.footer}>
                    {confirmButtonProps && (
                        <button
                            className={clsx(styles.confirmButton, confirmButtonProps.className)}
                            onClick={confirmButtonProps.onClick}
                        >
                            {confirmButtonProps.label ?? 'שמור'}
                        </button>
                    )}
                    {cancelButtonProps && (
                        <button
                            className={clsx(styles.cancelButton, cancelButtonProps.className)}
                            onClick={cancelButtonProps.onClick}
                        >
                            {cancelButtonProps.label ?? 'ביטול'}
                        </button>
                    )}

                </div>
            ) : null}
        </Drawer>
    );
};
