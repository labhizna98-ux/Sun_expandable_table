import { useMemo, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';
import GovernanceLayout from '../components/layout/GovernanceLayout.jsx';
import { EnterpriseTable } from '../components/common/EnterpriseTable/index.js';
import { classificationColumns } from '../config/classificationColumns.jsx';
import { classificationData } from '../data/classificationData.js';
import { filterRowsBySearch } from '../utils/tableHelpers.js';
import { SENSITIVITY_COLORS } from '../utils/constants.js';

const SEARCH_FIELDS = ['code', 'classification_level', 'category', 'description', 'fields'];

/**
 * PII Information Classification page — governance portal module.
 */
function PiiClassificationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const filteredRows = useMemo(
    () => filterRowsBySearch(classificationData, searchQuery, SEARCH_FIELDS),
    [searchQuery],
  );

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredRows.slice(start, start + rowsPerPage);
  }, [filteredRows, page, rowsPerPage]);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  }, []);

  const handlePageChange = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return (
    <GovernanceLayout
      title="PII Information Classification"
      subtitle="Manage and review data classification levels across the organization"
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 2,
          }}
        >
          <TextField
            size="small"
            placeholder="Search classifications…"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search classifications"
            sx={{
              width: { xs: '100%', sm: 280 },
              '& .MuiOutlinedInput-root': {
                fontSize: '0.8125rem',
                backgroundColor: '#fff',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" sx={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <EnterpriseTable
          columns={classificationColumns}
          rows={paginatedRows}
          defaultSortField="code"
          maxVisibleChips={4}
          getChipColor={(_field, _index, row) =>
            SENSITIVITY_COLORS[row?.sensitivity] ?? 'default'
          }
          stickyHeader
        />

        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 20, 50]}
          labelRowsPerPage="Rows per page"
          sx={{
            borderTop: '1px solid #e5e7eb',
            fontSize: '0.8125rem',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.8125rem',
              color: '#4b5563',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#fff8e1',
              color: '#1f2937',
            },
          }}
        />
      </Box>
    </GovernanceLayout>
  );
}

export default PiiClassificationPage;
