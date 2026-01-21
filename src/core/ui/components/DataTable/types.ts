import type {
  ColumnDef,
  SortingState,
  PaginationState,
} from '@tanstack/react-table'

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  isLoading?: boolean
  enableSorting?: boolean
  enablePagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  emptyMessage?: string
  className?: string
  onRowClick?: (row: TData) => void
}

export interface DataTableState {
  sorting: SortingState
  pagination: PaginationState
}

export type { ColumnDef, SortingState, PaginationState }
