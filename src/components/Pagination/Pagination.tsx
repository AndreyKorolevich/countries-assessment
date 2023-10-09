import { Pagination as MUPagination, Paper, Stack, styled } from '@mui/material'
import { PaginationComponent } from './types.ts'
import { PAGE_SIZE } from '../../constants.ts'

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: '1.5rem',
  padding: theme.spacing(1),
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  margin: `0 ${theme.spacing(3)}`,
  backgroundColor: 'rgba(255,255,255, 0.85)',
  backdropFilter: 'blur(4px)',
  border: 'solid 1px rgba(0, 0, 0, 0.23)',
  [theme.breakpoints.down('sm')]: {
    // Adjust styles for small devices
    margin: `0 0.8rem`,
    paddingLeft: 0,
    paddingRight: 0,
  },
}))

const Pagination: PaginationComponent = ({ onChangePage, page, countriesCount }) => {
  return (
    <StyledPaper elevation={3}>
      <Stack spacing={2}>
        <MUPagination
          page={page}
          onChange={onChangePage}
          count={Math.ceil(countriesCount / PAGE_SIZE)}
          variant='outlined'
          shape='rounded'
        />
      </Stack>
    </StyledPaper>
  )
}

export default Pagination
