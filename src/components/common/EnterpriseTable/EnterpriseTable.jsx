import { memo, useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import EnterpriseTableHeader from './EnterpriseTableHeader';
import EnterpriseTableRow from './EnterpriseTableRow';
import useTableExpansion from '../../../hooks/useTableExpansion';
import { SORT_DIRECTION } from '../../../utils/constants';
import {
  emptyStateSx,
  loadingOverlaySx,
  tableContainerSx,
  tableSx,
} from './tableStyles';

/**
 * Reusable enterprise table wrapper.
 * Config-driven columns/rows, expansion state, sorting, empty/loading states.
 */
const EnterpriseTable = memo(function EnterpriseTable({
  columns = [],
  rows = [],
  loading = false,
  expandedRows: controlledExpandedRows,
  onRowExpand,
  maxVisibleChips,
  getChipColor,
  getChipVariant,
  emptyMessage = 'No records found',
  stickyHeader = true,
  containerSx = {},
  sortable = true,
  defaultSortField,
  defaultSortDirection = SORT_DIRECTION.ASC,
}) {
  const [sortField, setSortField] = useState(defaultSortField ?? columns[0]?.field);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);

  const { expandedRows, toggleRow, isExpanded } = useTableExpansion({
    expandedRows: controlledExpandedRows,
    onRowExpand,
  });

  const handleSort = useCallback(
    (field) => {
      if (!sortable) return;
      const isAsc = sortField === field && sortDirection === SORT_DIRECTION.ASC;
      setSortDirection(isAsc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC);
      setSortField(field);
    },
    [sortField, sortDirection, sortable],
  );

  const sortedRows = useMemo(() => {
    if (!sortField || !rows?.length) return rows ?? [];

    return [...rows].sort((a, b) => {
      const aVal = String(a[sortField] ?? '').toLowerCase();
      const bVal = String(b[sortField] ?? '').toLowerCase();
      if (aVal < bVal) return sortDirection === SORT_DIRECTION.ASC ? -1 : 1;
      if (aVal > bVal) return sortDirection === SORT_DIRECTION.ASC ? 1 : -1;
      return 0;
    });
  }, [rows, sortField, sortDirection]);

  const colSpan = columns.length;

  if (loading) {
    return (
      <TableContainer sx={{ ...tableContainerSx, ...containerSx }}>
        <Box sx={loadingOverlaySx} role="status" aria-live="polite">
          <CircularProgress size={28} sx={{ mb: 1 }} />
          <Box>Loading data…</Box>
        </Box>
      </TableContainer>
    );
  }

  return (
    <TableContainer
      sx={{
        ...tableContainerSx,
        maxHeight: stickyHeader ? 560 : undefined,
        overflow: 'auto',
        ...containerSx,
      }}
    >
      <Table stickyHeader={stickyHeader} sx={tableSx} aria-label="Enterprise data table">
        <EnterpriseTableHeader
          columns={columns}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={sortable ? handleSort : undefined}
        />
        <TableBody>
          {sortedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan}>
                <Box sx={emptyStateSx} role="status">
                  {emptyMessage}
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            sortedRows.map((row, rowIndex) => {
              const rowId = row.id ?? row.code;
              return (
                <EnterpriseTableRow
                  key={rowId}
                  row={row}
                  rowIndex={rowIndex}
                  columns={columns}
                  expanded={isExpanded(rowId)}
                  onToggleExpand={toggleRow}
                  maxVisibleChips={maxVisibleChips}
                  getChipColor={getChipColor}
                  getChipVariant={getChipVariant}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default EnterpriseTable;
