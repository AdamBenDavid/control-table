import React, {useState} from 'react';
import {flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table';
import {Select, Table, TableBody, TableCell, TableHead, TableRow, Typography,} from '@material-ui/core';
import styles from './deployment-points-table.module.scss';
import type {DeploymentPoint} from '../types';
import editIcon from '../icons/Edit.svg';
import saveButton from '../icons/save.svg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {deploymentPointsTableColumns} from './columns.tsx';
import {isActionsColumnCell} from "./table.utils.tsx";
import {useQuery} from "@tanstack/react-query";
import {TABLE_PAGE_SIZE, TABLE_PAGE_SIZES_OPTIONS} from "./table.const.ts";
import {DeploymentPointService} from "../../api/deployment-points.api.ts";

interface Props {
    onDelete: (row: DeploymentPoint) => void;
    onEdit: (row: DeploymentPoint) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    search?: string;
}

export const DeploymentPointsManagementTable: React.FC<Props> = ({
                                                                     onEdit,
                                                                     onDelete,
                                                                     isEditing = false,
                                                                     setIsEditing,
                                                                     search
                                                                 }) => {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: TABLE_PAGE_SIZE
    });

    const {data, isLoading} = useQuery({
        queryKey: ['deployment-points', pagination.pageIndex, pagination.pageSize, search],
        queryFn: async () =>
            DeploymentPointService.getDeploymentPointsMock({
                pageSize: pagination.pageSize,
                pageIndex: pagination.pageIndex,
                search,
            }),
        placeholderData: (prevData) => prevData,
    });


    console.log({data, pagination})

    const table = useReactTable({
        data: data?.data || [],
        columns: deploymentPointsTableColumns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        debugTable: true,
        pageCount: data ? Math.ceil(data.total / pagination.pageSize) : 0,
        state: {
            columnVisibility: {
                actions: isEditing
            },
            pagination,
        },
        onPaginationChange: setPagination,
        meta: {
            isEditing,
            onEdit,
            onDelete,
        },
    });

    if (!data || isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div className={styles.tableContainer}>
            <div className={styles.headerRow}>
                <Typography className={styles.title}>נקודות פריסה</Typography>
                <button
                    className={isEditing ? styles.saveButton : styles.editButton}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <img src={isEditing ? saveButton : editIcon} alt='Edit' className={styles.icon}/>
                    {isEditing ? 'צא ממצב עריכה' : 'עריכה'}
                </button>
            </div>

            <Table className={styles.table} stickyHeader>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableCell key={header.id} colSpan={header.colSpan} align={'right'}
                                               style={{width: `${header.getSize()}px`}}
                                               className={styles.headerCell}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={styles.header}>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHead>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className={styles.tableRow}>
                            {row.getVisibleCells().map((cell) => {
                                const isActionsCell = isActionsColumnCell(cell);
                                return (
                                    <TableCell key={cell.id}
                                               align={isActionsCell ? 'center' : 'right'}
                                               style={isActionsCell ? {
                                                   padding: 0,
                                               } : {}}
                                               className={styles.cellWithDivider}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={styles.paginationFooter}>

                <div className={styles.footerRight}>
                    <div className={styles.paginationButtons}>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className={styles.paginationButton}
                        >
                            <ChevronRightIcon/>
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className={styles.paginationButton}
                        >
                            <ChevronLeftIcon/>
                        </button>
                    </div>
                    <div className={styles.paginationInfo}>
                        {`עמוד ${pagination.pageIndex + 1} מתוך ${table.getPageCount()}`}
                    </div>
                </div>

                <div className={styles.footerLeft}>
                    <div className={styles.pageSizeSelector}>
                        <label htmlFor="pageSize">מספר פריטים בעמוד:</label>
                        <Select
                            id="pageSize"
                            value={pagination.pageSize}
                            onChange={(e) => {
                                setPagination({
                                    ...pagination,
                                    pageSize: Number(e.target.value),
                                    pageIndex: 0,
                                });
                            }}
                        >
                            {TABLE_PAGE_SIZES_OPTIONS.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.totalCount}>
                        {`סה"כ נקודות פריסה: ${data.total}`}
                    </div>
                </div>
            </div>
        </div>
    );
};