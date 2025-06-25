import React, {useState} from 'react';
import {flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table';
import {Table, TableBody, TableCell, TableHead, TableRow,} from '@material-ui/core';
import styles from './deployment-points-table.module.scss';
import type {DeploymentPoint} from '../types';
import editIcon from '../icons/Edit.svg';
import saveButton from '../icons/save.svg';
import {deploymentPointsTableColumns} from './columns.tsx';
import {isActionsColumnCell} from "./table.utils.tsx";
import {useQuery} from "@tanstack/react-query";
import {TABLE_PAGE_SIZE} from "./table.const.ts";
import {TableFooter} from "../../TableFooter";
import Skeleton from 'react-loading-skeleton'
import {generateMockDeploymentPoints} from "../mockData.ts";
import {DeploymentPointService} from "../../api/deployment-points.api.ts";
import {cloneDeep} from 'lodash';


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


    const adjustedColumns = cloneDeep(deploymentPointsTableColumns).map((col) => {
        if ('size' in col && 'minSize' in col) {
            return {
                ...col,
                size: isEditing && col.minSize ? col.minSize : col.size,
            };
        }
        return col;
    });


    const [totalItems, setTotalItems] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: ['deployment-points', pagination.pageIndex, pagination.pageSize, search],
        queryFn: async () => {
            const response = await DeploymentPointService.getDeploymentPointsMock({
                pageSize: pagination.pageSize,
                pageIndex: pagination.pageIndex,
                search,
            })

            setTotalItems(response.total);

            return response
        }
    });


    const table = useReactTable({
        data: data?.data || generateMockDeploymentPoints(TABLE_PAGE_SIZE),
        columns: adjustedColumns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        debugTable: true,
        pageCount: totalItems ? Math.ceil(totalItems / pagination.pageSize) : 0,
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


    return (
        <div className={styles.tableContainer}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>נקודות פריסה</h2>
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

                <TableBody className={styles.tableBody}>
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
                                        {isLoading || !data ?
                                            <Skeleton/> :
                                            flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                totalItems={data?.total ?? 0}
                pageCount={table.getPageCount()}
                prevPage={{
                    onClick: () => table.previousPage(),
                    disabled: !table.getCanPreviousPage(),
                }}
                nextPage={{
                    onClick: () => table.nextPage(),
                    disabled: !table.getCanNextPage(),
                }}
                totalRowsSuffix={'תוצאות'}
            />
        </div>
    );
};