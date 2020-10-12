import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import data from "../_mockData.json";
import ExchangeRate from "./collaborators/ExchangeRate";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bolder",
  },
  body: {
    fontSize: 12,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

interface Props {
  exchange: number;
  handleDetail: Function;
}

const AccountBalanceList = ({ exchange = 0, handleDetail }: Props) => {
  const classes = useStyles();

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="specialColumn">Account name</StyledTableCell>
              <StyledTableCell className="specialColumn" align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Tags</StyledTableCell>
              <StyledTableCell align="right">Balance</StyledTableCell>
              <StyledTableCell align="right">Available balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const {
                id,
                balance = 0,
                available = 0,
                name = "",
                category = "",
                tags = "",
              } = row;
              return (
                <StyledTableRow
                  key={name}
                  onClick={() => handleDetail(id, exchange)}
                >
                  <StyledTableCell component="th" scope="row">
                    {name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{category}</StyledTableCell>
                  <StyledTableCell align="left">{tags}</StyledTableCell>
                  <StyledTableCell align="right">
                    <ExchangeRate balance={balance} exchange={exchange} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ExchangeRate balance={available} exchange={exchange} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AccountBalanceList;
