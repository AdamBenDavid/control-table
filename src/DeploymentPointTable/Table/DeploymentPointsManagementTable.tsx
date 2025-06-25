import React, {useState} from 'react';
import {flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography,} from '@material-ui/core';
import styles from './deployment-points-table.module.scss';
import type {DeploymentPoint} from '../types';
import editIcon from '../icons/Edit.svg';
import saveButton from '../icons/save.svg';
import {deploymentPointsTableColumns} from './columns.tsx';
import {isActionsColumnCell} from "./table.utils.tsx";
import {useQuery} from "@tanstack/react-query";
import {TABLE_PAGE_SIZE} from "./table.const.ts";
import {DeploymentPointService} from "../../api/deployment-points.api.ts";
import {TableFooter} from "../../TableFooter";

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
                    {!isEditing && <img src={isEditing ? saveButton : editIcon} alt='Edit' className={styles.icon}/>}
                    {isEditing ? 'סיום עריכה' : 'עריכה'}
                </button>
            </div>

            <Table className={styles.table} stickyHeader>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableCell key={header.id} colSpan={header.colSpan}
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
                                               align={isActionsCell ? 'center' : 'left'}
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
            <TableFooter
                pageIndex={pagination.pageIndex}
                pageSize={pagination.pageSize}
                totalItems={data.total}
                pageCount={table.getPageCount()}
                prevPage={{
                    onClick: () => table.previousPage(),
                    disabled: !table.getCanPreviousPage(),
                }}
                nextPage={{
                    onClick: () => table.nextPage(),
                    disabled: !table.getCanNextPage(),
                }}
                onPageSizeChange={(newSize) =>
                    setPagination({...pagination, pageSize: newSize, pageIndex: 0})
                }
                totalRowsLabel={`סה"כ נקודות פריסה: ${data.total}`}
            />
        </div>
    );
};