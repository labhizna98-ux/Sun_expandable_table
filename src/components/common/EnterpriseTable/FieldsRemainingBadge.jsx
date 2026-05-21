import { memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { remainingBadgeSx } from './tableStyles';

/**
 * +N overflow badge — shown on every row with more fields than the visible limit.
 * Clicking expands the row (same behaviour as the expand arrow).
 */
const FieldsRemainingBadge = memo(function FieldsRemainingBadge({
  count,
  onClick,
  rowId,
}) {
  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      onClick?.(rowId);
    },
    [onClick, rowId],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        onClick?.(rowId);
      }
    },
    [onClick, rowId],
  );

  if (!count || count <= 0) return null;

  return (
    <Tooltip
      title={`Click to view all ${count} remaining field(s)`}
      arrow
      placement="top"
    >
      <Box
        component="span"
        role="button"
        tabIndex={0}
        sx={remainingBadgeSx}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`${count} more fields, click to expand`}
      >
        +{count}
      </Box>
    </Tooltip>
  );
});

export default FieldsRemainingBadge;
