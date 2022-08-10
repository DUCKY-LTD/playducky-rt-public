import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './ExperimentList.module.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#fcfeff',
        color: '#858e94',
        border: '1px solid #dfe4eb',
        textAlign: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid #dfe4eb',
        textAlign: 'left'
    },
}));

//dynamic styles for status
const makeColorStatus = (type) => {
    if (type === 'Results Ready') {
        return styles.ready
    }
    if (type === 'Rejected') {
        return styles.rejected
    }
    if (type === 'Waiting for approval') {
        return styles.waiting
    }
    if (type === 'Running') {
        return styles.running
    }
}

//dynamic styles for type
const makeColorType = (type) => {
    if (type === 'CPI') {
        return styles.cpi
    }
    if (type === 'CTR') {
        return styles.ctr
    }
    if (type === 'MON') {
        return styles.mon
    }
}


export default function ExperimentList({data, testRedirectHandler}) {

    return (
        <>
            {data.length === 0 ? <p className={styles.altText}>No matching records found</p> :
                (<TableContainer component={Paper} sx={{boxShadow: 'none', borderRadius: '0'}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Test No</StyledTableCell>
                                <StyledTableCell align="right">Type</StyledTableCell>
                                <StyledTableCell align="right">Creation Date</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Creatives</StyledTableCell>
                                <StyledTableCell align="right">What's new?</StyledTableCell>
                                <StyledTableCell align="right">Best CTR</StyledTableCell>
                                <StyledTableCell align="right">Best CPI</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{cursor: 'pointer'}}>
                            {data.map(({index, type, date, status, creatives, whatsNew, bestCtr, bestCpi, id}, idx) => (
                                <TableRow key={idx}>
                                    <StyledTableCell component="th" scope="row" onClick={() => testRedirectHandler(id)}>
                                        {index}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" onClick={() => testRedirectHandler(id)}>
                                        <span className={makeColorType(type)}>{type}</span>
                                    </StyledTableCell>
                                    <StyledTableCell align="right" onClick={() => testRedirectHandler(id)}>{date}</StyledTableCell>
                                    <StyledTableCell align="right" onClick={() => testRedirectHandler(id)}>
                                        <span className={makeColorStatus(status)}>{status.toUpperCase()}</span>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <a className={styles.link} href={creatives} target='_blank'
                                           rel="noopener noreferrer">CREATIVES</a>
                                    </StyledTableCell>
                                    <StyledTableCell align="right" onClick={() => testRedirectHandler(id)}>{whatsNew}</StyledTableCell>
                                    <StyledTableCell align="right" onClick={() => testRedirectHandler(id)}>{bestCtr ? (`${bestCtr}%`): '-'}</StyledTableCell>
                                    <StyledTableCell align="right" onClick={() => testRedirectHandler(id)}>{bestCpi ? (`$${bestCpi}`):'-'}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)
            }
        </>
    );
}
