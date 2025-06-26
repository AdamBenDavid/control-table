import React from 'react';
import styles from './styles.module.scss';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {MenuItem, Select} from '@material-ui/core';

export interface TableFooterProps {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    pageCount: number;
    prevPage: {
        onClick: () => void;
        disabled: boolean;
    };
    nextPage: {
        onClick: () => void;
        disabled: boolean;
    };
    onPageSizeChange?: (newSize: number) => void;
    totalRowsLabel?: string;
    totalRowsSuffix?: string;
    pageSizeOptions?: number[];
}

export const TableFooter: React.FC<TableFooterProps> = ({
                                                            pageIndex,
                                                            pageSize,
                                                            pageCount,
                                                            nextPage,
                                                            prevPage,
                                                            onPageSizeChange,
                                                            totalItems,
                                                            totalRowsLabel,
                                                            totalRowsSuffix,
                                                            pageSizeOptions,
                                                        }) => {
    return (
        <div className={styles.paginationFooter}>
            <div className={styles.footerRight}>
                <div className={styles.paginationButtons}>
                    <button
                        onClick={prevPage.onClick}
                        disabled={prevPage.disabled}
                        className={styles.paginationButton}
                    >
                        <ChevronRightIcon/>
                    </button>
                    <button
                        onClick={nextPage.onClick}
                        disabled={nextPage.disabled}
                        className={styles.paginationButton}
                    >
                        <ChevronLeftIcon/>
                    </button>
                </div>
                <div className={styles.paginationInfo}>
                    {`עמוד ${pageIndex + 1} מתוך ${pageCount}`}
                </div>
            </div>

            <div className={styles.footerLeft}>
                {pageSizeOptions && onPageSizeChange && <div className={styles.pageSizeSelector}>
                    <label htmlFor="pageSize">כמות שורות בעמוד</label>
                    <Select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    >
                        {pageSizeOptions.map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </div>}
                {totalRowsLabel ?
                    <div className={styles.totalCount}>
                        {totalRowsLabel}
                    </div> :
                    <div className={styles.totalCount}>
                        {`${totalItems} ${totalRowsSuffix ?? ''}`}
                    </div>
                }
            </div>
        </div>
    );
};
