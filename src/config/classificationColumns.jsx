import Box from '@mui/material/Box';
import { ellipsisCellSx } from '../components/common/EnterpriseTable/tableStyles';

/**
 * Column configuration for PII Classification module.
 * Mirrors DataGrid-style config but consumed by EnterpriseTable.
 */
export const classificationColumns = [
  {
    field: 'code',
    headerName: 'Code',
    minWidth: 80,
    width: '8%',
    sortable: true,
    filterable: true,
  },
  {
    field: 'classification_level',
    headerName: 'Classification Level',
    minWidth: 180,
    width: '18%',
    sortable: true,
    filterable: true,
    renderCell: ({ value }) => (
      <Box component="span" sx={ellipsisCellSx} title={value}>
        {value}
      </Box>
    ),
  },
  {
    field: 'category',
    headerName: 'Category',
    minWidth: 160,
    width: '14%',
    sortable: true,
    filterable: true,
    renderCell: ({ value }) => (
      <Box component="span" sx={ellipsisCellSx} title={value}>
        {value}
      </Box>
    ),
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 280,
    width: '28%',
    sortable: true,
    filterable: true,
    renderCell: ({ value }) => (
      <Box component="span" sx={ellipsisCellSx} title={value}>
        {value}
      </Box>
    ),
  },
  {
    field: 'fields',
    headerName: 'Fields',
    minWidth: 360,
    width: '32%',
    sortable: false,
    filterable: false,
  },
];

export default classificationColumns;
