import type {Cell} from "@tanstack/react-table";
import {TABLE_ACTIONS_COLUMN_ID} from "./table.const.ts";

export const isActionsColumnCell = <T,>(cell: Cell<T, unknown>) => cell.column.id === TABLE_ACTIONS_COLUMN_ID;