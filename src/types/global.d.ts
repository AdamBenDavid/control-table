import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface TableMeta<TRow> {
        isEditing?: boolean;
        onEdit?: (row: TRow) => void;
        onDelete?: (row: TRow) => void;
    }

    interface ColumnMeta<TRow, TValue> {
        widthSize?: 'small' | 'medium' | 'large';
    }
}
