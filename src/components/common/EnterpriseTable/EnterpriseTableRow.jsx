import { memo, useCallback } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ExpandableFields from './ExpandableFields';
import { getCellValue } from '../../../utils/tableHelpers';
import { DEFAULT_MAX_VISIBLE_CHIPS } from '../../../utils/constants';
import { getBodyRowSx, ellipsisCellSx } from './tableStyles';

/**
 * Single enterprise table row with expandable Fields column.
 * Row height grows naturally when Fields section expands (table cell stretch).
 */
const EnterpriseTableRow = memo(function EnterpriseTableRow({
  row,
  rowIndex = 0,
  columns = [],
  expanded = false,
  onToggleExpand,
  maxVisibleChips = DEFAULT_MAX_VISIBLE_CHIPS,
  getChipColor,
  getChipVariant,
}) {
  const rowId = row?.id ?? row?.code;

  const handleToggle = useCallback(
    (id) => {
      onToggleExpand?.(id ?? rowId);
    },
    [onToggleExpand, rowId],
  );

  const renderCellContent = (column) => {
    const value = getCellValue(row, column.field);

    if (column.renderCell) {
      return column.renderCell({
        value,
        row,
        field: column.field,
        expanded,
        onToggleExpand: handleToggle,
      });
    }

    if (column.field === 'fields') {
      return (
        <ExpandableFields
          fields={row.fields}
          expanded={expanded}
          onToggle={handleToggle}
          rowId={rowId}
          maxVisible={maxVisibleChips}
          getChipColor={(field, index) => getChipColor?.(field, index, row) ?? 'default'}
          getChipVariant={(field, index) => getChipVariant?.(field, index, row) ?? 'outlined'}
        />
      );
    }

    const displayValue = value ?? '—';

    return (
      <Tooltip title={String(displayValue)} arrow placement="top" disableHoverListener={!displayValue}>
        <Box component="span" sx={ellipsisCellSx}>
          {displayValue}
        </Box>
      </Tooltip>
    );
  };

  return (
    <TableRow hover sx={getBodyRowSx(rowIndex)} aria-expanded={expanded}>
      {columns.map((column) => (
        <TableCell
          key={`${rowId}-${column.field}`}
          align={column.align ?? 'left'}
          style={{
            width: column.width,
            minWidth: column.minWidth,
          }}
          sx={{
            ...column.cellSx,
            verticalAlign: column.field === 'fields' ? 'top' : 'middle',
          }}
        >
          {renderCellContent(column)}
        </TableCell>
      ))}
    </TableRow>
  );
});

export default EnterpriseTableRow;
