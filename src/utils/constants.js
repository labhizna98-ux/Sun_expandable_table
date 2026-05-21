/**
 * Global table configuration constants.
 * Centralized so modules can override via props while sharing defaults.
 */

export const DEFAULT_MAX_VISIBLE_CHIPS = 4;

export const TABLE_ROW_COLORS = {
  odd: '#dddddd',
  even: '#ffffff',
};

/** Above this count, expanded view uses a scrollable chip container */
export const LARGE_FIELDS_THRESHOLD = 80;

export const TABLE_EMPTY_MESSAGE = 'No records found';

export const TABLE_LOADING_MESSAGE = 'Loading data…';

export const EXPANSION_ANIMATION_TIMEOUT = 300;

export const CHIP_MAX_LABEL_LENGTH = 32;

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SENSITIVITY_COLORS = {
  PUBLIC: 'default',
  LOW: 'info',
  MEDIUM: 'warning',
  HIGH: 'error',
  CRITICAL: 'error',
};
