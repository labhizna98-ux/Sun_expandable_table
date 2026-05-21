import { memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FieldsChipRenderer from './FieldsChipRenderer';
import FieldsRemainingBadge from './FieldsRemainingBadge';
import { partitionFields } from '../../../utils/tableHelpers';
import {
  DEFAULT_MAX_VISIBLE_CHIPS,
  EXPANSION_ANIMATION_TIMEOUT,
  LARGE_FIELDS_THRESHOLD,
} from '../../../utils/constants';
import {
  chipsCollapsedRowSx,
  chipsExpandedScrollSx,
  chipsExpandedWrapperSx,
  chipsWrapperSx,
  collapseInnerSx,
  expandButtonSx,
  fieldsCellSx,
  noFieldsTextSx,
} from './tableStyles';

/**
 * Collapsed: first N chips + +remaining badge.
 * Expanded (arrow click): all fields visible, wrapped (scrollable for large catalogs).
 */
const ExpandableFields = memo(function ExpandableFields({
  fields = [],
  expanded = false,
  onToggle,
  maxVisible = DEFAULT_MAX_VISIBLE_CHIPS,
  rowId,
  getChipColor,
  getChipVariant,
  animationTimeout = EXPANSION_ANIMATION_TIMEOUT,
}) {
  const { visible, hidden, hasMore, total } = partitionFields(fields, maxVisible);
  const useScrollContainer = total > LARGE_FIELDS_THRESHOLD;

  const handleToggle = useCallback(
    (event) => {
      if (event?.stopPropagation) event.stopPropagation();
      onToggle?.(rowId);
    },
    [onToggle, rowId],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        onToggle?.(rowId);
      }
    },
    [onToggle, rowId],
  );

  if (total === 0) {
    return (
      <Box component="span" sx={noFieldsTextSx}>
        No fields classified
      </Box>
    );
  }

  const renderChip = (field, index) => (
    <FieldsChipRenderer
      key={`${rowId}-${index}`}
      label={field}
      color={getChipColor?.(field, index) ?? 'default'}
      variant={getChipVariant?.(field, index) ?? 'outlined'}
    />
  );

  return (
    <Box sx={fieldsCellSx}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          minWidth: 0,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {!expanded && (
            <Box sx={chipsCollapsedRowSx} aria-label={`${total} classified fields`}>
              <Box sx={chipsWrapperSx}>{visible.map(renderChip)}</Box>

              {hasMore && (
                <FieldsRemainingBadge
                  count={hidden.length}
                  onClick={handleToggle}
                  rowId={rowId}
                />
              )}
            </Box>
          )}

          <Collapse
            in={expanded}
            timeout={animationTimeout}
            unmountOnExit
            sx={collapseInnerSx}
          >
            <Box
              sx={useScrollContainer ? chipsExpandedScrollSx : chipsExpandedWrapperSx}
              role="region"
              aria-label={`All ${total} classified fields`}
            >
              {fields.map(renderChip)}
            </Box>
          </Collapse>
        </Box>

        {hasMore && (
          <IconButton
            size="small"
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? 'Collapse fields'
                : `Expand to show all ${total} fields`
            }
            sx={expandButtonSx}
            tabIndex={0}
          >
            {expanded ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>
    </Box>
  );
});

export default ExpandableFields;
