import { memo } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { headerRowSx, sortableHeaderSx } from './tableStyles';

/**
 * Config-driven table header with optional sort support.
 */
const EnterpriseTableHeader = memo(function EnterpriseTableHeader({
  columns = [],
  sortField,
  sortDirection,
  onSort,
}) {
  return (
    <TableHead>
      <TableRow sx={headerRowSx}>
        {columns.map((column) => {
          const isActive = sortField === column.field;
          const isSortable = column.sortable && onSort;

          return (
            <TableCell
              key={column.field}
              align={column.align ?? 'left'}
              style={{
                width: column.width,
                minWidth: column.minWidth,
              }}
              sx={column.headerSx}
              scope="col"
              aria-sort={
                isActive
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : undefined
              }
            >
              {isSortable ? (
                <TableSortLabel
                  active={isActive}
                  direction={isActive ? sortDirection : 'asc'}
                  onClick={() => onSort(column.field)}
                  sx={sortableHeaderSx}
                >
                  {column.headerName}
                </TableSortLabel>
              ) : (
                <Box component="span" sx={sortableHeaderSx}>
                  {column.headerName}
                </Box>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
});

export default EnterpriseTableHeader;
