import { TABLE_ROW_COLORS } from '../../../utils/constants';

/**
 * Centralized enterprise table styles.
 * Keeps visual tokens consistent across governance modules.
 */

export const tableContainerSx = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  overflow: 'hidden',
  width: '100%',
};

export const tableSx = {
  minWidth: 720,
  tableLayout: 'fixed',
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #e8eaed',
    fontSize: '0.8125rem',
    lineHeight: 1.4,
    color: '#1f2937',
    py: 1,
    px: 1.5,
    verticalAlign: 'top',
  },
};

export const headerRowSx = {
  backgroundColor: '#fafbfc',
  '& .MuiTableCell-head': {
    fontWeight: 600,
    fontSize: '0.8125rem',
    color: '#374151',
    borderBottom: '1px solid #d1d5db',
    whiteSpace: 'nowrap',
    py: 1.25,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#fafbfc',
  },
};

/** Zebra striping: odd rows #dddddd, even rows #ffffff (1-based row order) */
export const getBodyRowSx = (rowIndex) => {
  const isOddRow = rowIndex % 2 === 0;
  const backgroundColor = isOddRow ? TABLE_ROW_COLORS.odd : TABLE_ROW_COLORS.even;

  return {
    backgroundColor,
    transition: 'background-color 0.15s ease',
    '& .MuiTableCell-root': {
      backgroundColor: 'inherit',
    },
    '&:hover': {
      backgroundColor: isOddRow ? '#d4d4d4' : '#f5f5f5',
      '& .MuiTableCell-root': {
        backgroundColor: 'inherit',
      },
    },
    '&:last-child .MuiTableCell-root': {
      borderBottom: '1px solid #e8eaed',
    },
  };
};

export const ellipsisCellSx = {
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
};

export const fieldsCellSx = {
  width: '100%',
  minWidth: 0,
};

export const chipsWrapperSx = {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: 0.5,
  minWidth: 0,
  flex: 1,
  overflow: 'hidden',
};

export const chipsCollapsedRowSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  width: '100%',
  minWidth: 0,
};

export const chipsExpandedWrapperSx = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 0.5,
  pt: 0.75,
};

export const chipsExpandedScrollSx = {
  ...chipsExpandedWrapperSx,
  maxHeight: 280,
  overflowY: 'auto',
  overflowX: 'hidden',
  pr: 0.5,
  '&::-webkit-scrollbar': { width: 6 },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#d1d5db',
    borderRadius: 3,
  },
};

export const expandButtonSx = {
  ml: 0.5,
  flexShrink: 0,
  color: '#6b7280',
  p: 0.25,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
};

export const remainingBadgeSx = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 32,
  height: 22,
  px: 0.75,
  borderRadius: '11px',
  border: '1px solid #d1d5db',
  backgroundColor: '#f3f4f6',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#4b5563',
  flexShrink: 0,
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.15s ease, border-color 0.15s ease',
  '&:hover': {
    backgroundColor: '#e5e7eb',
    borderColor: '#9ca3af',
  },
  '&:focus-visible': {
    outline: '2px solid #f9a825',
    outlineOffset: 1,
  },
};

export const emptyStateSx = {
  py: 6,
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '0.875rem',
};

export const loadingOverlaySx = {
  py: 4,
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '0.875rem',
};

export const sortableHeaderSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.25,
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    color: '#111827',
  },
};

export const collapseInnerSx = {
  overflow: 'hidden',
};

export const noFieldsTextSx = {
  fontSize: '0.8125rem',
  color: '#9ca3af',
  fontStyle: 'italic',
};
