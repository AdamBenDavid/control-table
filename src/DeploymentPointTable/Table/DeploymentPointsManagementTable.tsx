import React from 'react';
import {flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography,} from '@material-ui/core';
import styles from './deployment-points-table.module.scss';
import type {DeploymentPoint} from '../types';
import editIcon from '../icons/Edit.svg';
import saveButton from '../icons/save.svg';
import {deploymentPointsTableColumns} from './columns.tsx';
import {isActionsColumnCell} from "./table.utils.tsx";

interface Props {
  data: DeploymentPoint[];
  onDelete: (row: DeploymentPoint) => void;
  onEdit: (row: DeploymentPoint) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const DeploymentPointsManagementTable: React.FC<Props> = ({
                                                                   data,
                                                                   onEdit,
                                                                   onDelete,
                                                                   isEditing = false,
                                                                   setIsEditing,
                                                                 }) => {
  const table = useReactTable({
    data,
    columns: deploymentPointsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
    state: {
      columnVisibility: {
        actions: isEditing
      }
    },
    meta: {
      isEditing,
      onEdit,
      onDelete,
    },
  });

  const {pageIndex} = table.getState().pagination;

  return (
      <div className={styles.tableContainer}>
        <div className={styles.headerRow}>
          <Typography className={styles.title}>נקודות פריסה</Typography>
          <Button
              className={isEditing ? styles.editButtonActive : styles.editButton}
              onClick={() => setIsEditing(!isEditing)}
          >
            <img src={isEditing ? saveButton : editIcon} alt='Edit' className={styles.icon}/>
            {isEditing ? 'צא ממצב עריכה' : 'עריכה'}
          </Button>
        </div>

        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                        <TableCell key={header.id} colSpan={header.colSpan} align={'right'}
                                   className={styles.header}>
                          {header.isPlaceholder ? null : (
                              <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                          )}
                        </TableCell>
                    );
                  })}
                </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const isActionsCell = isActionsColumnCell(cell);
                    return (
                        <TableCell key={cell.id}
                                   align={isActionsCell ? 'center' : 'right'}
                                   style={isActionsCell ? {padding: 0} : {}}
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
          <div className={styles.paginationInfo}>
            {`${pageIndex + 1} - ${table.getPageCount()} עמודים`}
          </div>

          <div className={styles.paginationButtons}>
            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={styles.paginationButton}
            >
              {'<'}
            </button>
            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={styles.paginationButton}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
  );
};