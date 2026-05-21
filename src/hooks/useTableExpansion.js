import { useCallback, useMemo, useState } from 'react';
import { isRowExpanded, toggleExpandedRow } from '../utils/tableHelpers';

/**
 * Manages expandable row state for EnterpriseTable.
 * Returns controlled/uncontrolled-compatible API for parent modules.
 */
const useTableExpansion = ({
  expandedRows: controlledExpandedRows,
  onRowExpand,
  defaultExpandedRows = {},
} = {}) => {
  const [internalExpandedRows, setInternalExpandedRows] = useState(defaultExpandedRows);

  const isControlled = controlledExpandedRows !== undefined;
  const expandedRows = isControlled ? controlledExpandedRows : internalExpandedRows;

  const toggleRow = useCallback(
    (rowId) => {
      const next = toggleExpandedRow(expandedRows, rowId);
      if (!isControlled) {
        setInternalExpandedRows(next);
      }
      onRowExpand?.(rowId, !isRowExpanded(expandedRows, rowId), next);
    },
    [expandedRows, isControlled, onRowExpand],
  );

  const expandRow = useCallback(
    (rowId) => {
      if (isRowExpanded(expandedRows, rowId)) return;
      toggleRow(rowId);
    },
    [expandedRows, toggleRow],
  );

  const collapseRow = useCallback(
    (rowId) => {
      if (!isRowExpanded(expandedRows, rowId)) return;
      toggleRow(rowId);
    },
    [expandedRows, toggleRow],
  );

  const collapseAll = useCallback(() => {
    const next = {};
    if (!isControlled) {
      setInternalExpandedRows(next);
    }
    onRowExpand?.(null, false, next);
  }, [isControlled, onRowExpand]);

  const expandedCount = useMemo(
    () => Object.values(expandedRows).filter(Boolean).length,
    [expandedRows],
  );

  return {
    expandedRows,
    toggleRow,
    expandRow,
    collapseRow,
    collapseAll,
    isExpanded: (rowId) => isRowExpanded(expandedRows, rowId),
    expandedCount,
  };
};

export default useTableExpansion;
