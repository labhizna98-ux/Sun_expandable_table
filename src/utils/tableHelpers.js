import { DEFAULT_MAX_VISIBLE_CHIPS } from './constants';

/**
 * Splits field chips into visible (collapsed) and hidden (expandable) sets.
 */
export const partitionFields = (fields = [], maxVisible = DEFAULT_MAX_VISIBLE_CHIPS) => {
  const safeFields = Array.isArray(fields) ? fields : [];
  const visible = safeFields.slice(0, maxVisible);
  const hidden = safeFields.slice(maxVisible);
  return {
    visible,
    hidden,
    hasMore: hidden.length > 0,
    total: safeFields.length,
  };
};

/**
 * Resolves a nested field value from a row object (e.g. "classification_level").
 */
export const getCellValue = (row, field) => {
  if (!row || !field) return '';
  return row[field] ?? '';
};

/**
 * Truncates text with ellipsis for compact table cells.
 */
export const truncateText = (text, maxLength = 80) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
};

/**
 * Toggles a Set-like expansion state (stored as Record<id, boolean>).
 */
export const toggleExpandedRow = (expandedRows, rowId) => ({
  ...expandedRows,
  [rowId]: !expandedRows[rowId],
});

/**
 * Returns whether a row is expanded.
 */
export const isRowExpanded = (expandedRows, rowId) => Boolean(expandedRows[rowId]);

/**
 * Sorts rows by a column field and direction.
 */
export const sortRows = (rows, field, direction = 'asc') => {
  if (!field || !rows?.length) return rows ?? [];

  const sorted = [...rows].sort((a, b) => {
    const aVal = String(getCellValue(a, field) ?? '').toLowerCase();
    const bVal = String(getCellValue(b, field) ?? '').toLowerCase();
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Filters rows by a search query across specified fields.
 */
export const filterRowsBySearch = (rows, query, searchFields = []) => {
  if (!query?.trim()) return rows ?? [];
  const normalized = query.trim().toLowerCase();

  return (rows ?? []).filter((row) =>
    searchFields.some((field) => {
      const value = getCellValue(row, field);
      if (Array.isArray(value)) {
        return value.some((item) => String(item).toLowerCase().includes(normalized));
      }
      return String(value ?? '').toLowerCase().includes(normalized);
    }),
  );
};

/**
 * Paginates an array of rows.
 */
export const paginateRows = (rows, page, rowsPerPage) => {
  const start = page * rowsPerPage;
  return (rows ?? []).slice(start, start + rowsPerPage);
};
