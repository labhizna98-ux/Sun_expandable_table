import { memo } from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { CHIP_MAX_LABEL_LENGTH } from '../../../utils/constants';
import { truncateText } from '../../../utils/tableHelpers';

/**
 * Globally reusable chip renderer for field labels.
 * Supports dynamic variants, truncation, and tooltips for long values.
 */
const FieldsChipRenderer = memo(function FieldsChipRenderer({
  label,
  variant = 'outlined',
  color = 'default',
  size = 'small',
  maxLabelLength = CHIP_MAX_LABEL_LENGTH,
  sx = {},
  ...chipProps
}) {
  const displayLabel = truncateText(label, maxLabelLength);
  const isTruncated = displayLabel !== label;

  const chip = (
    <Chip
      label={displayLabel}
      size={size}
      variant={variant}
      color={color}
      sx={{
        height: 22,
        fontSize: '0.75rem',
        fontWeight: 500,
        borderColor: '#d1d5db',
        color: '#374151',
        backgroundColor: '#ffffff',
        maxWidth: 180,
        '& .MuiChip-label': {
          px: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        ...sx,
      }}
      {...chipProps}
    />
  );

  if (isTruncated || (label && label.length > maxLabelLength)) {
    return (
      <Tooltip title={label} arrow placement="top">
        {chip}
      </Tooltip>
    );
  }

  return chip;
});

export default FieldsChipRenderer;
