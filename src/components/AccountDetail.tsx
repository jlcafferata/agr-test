import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import dataDetail from "../_mockDetailData.json";
import ExchangeRate from "./collaborators/ExchangeRate";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: 50,
  },
  root: {
    maxWidth: "80%",
    margin: "auto",
    height: "70%",
  },
  chip: {
    fontSize: 9,
    height: 14,
  },
  availableBalance:{
    color: '#5DC1B9'
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
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

interface Props {
  rowId: string;
  exchange: number;
}

const AccountDetail = ({ rowId, exchange = 1 }: Props) => {
  const [rowsDetail, setRowsDetail] = useState([
    {
      id: "",
      name: "",
      active: true,
      confirmed_date: "",
      order_id: "",
      order_code: "",
      transaction_type: "",
      debit: 0,
      credit: 0,
      balance: 0,
    },
  ]);
  const classes = useStyles();

  useEffect(() => {
    const detailFound = dataDetail.filter((row) => row.id === rowId);
    setRowsDetail(detailFound);
  }, [rowId]);

  const drawStatus = (status: boolean) => (
    <Chip
      className={classes.chip}
      label={status ? "Active" : "Inactive"}
      color={status ? "primary" : "secondary"}
    />
  );

  const evalRate = (balance: number) => (balance * exchange).toFixed(2);

  const availableBalance =(balance:number)=> `${balance} BTC ($ ${(balance*exchange).toFixed(2)})`;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {rowsDetail && rowsDetail.length && (
          <CardContent>
            <Typography variant="body2" gutterBottom>
              Account detail
            </Typography>
            <Typography variant="body2" gutterBottom>
              {rowsDetail[0].name} {drawStatus(rowsDetail[0].active)}
            </Typography>
            <Divider />
            <Typography variant="h4" gutterBottom className={classes.availableBalance}>
              {availableBalance(rowsDetail[0].balance)}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Available balance {availableBalance(rowsDetail[0].balance)}
            </Typography>
            <Container>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Confirmed date</StyledTableCell>
                      <StyledTableCell align="left">Order ID</StyledTableCell>
                      <StyledTableCell align="left">Order code</StyledTableCell>
                      <StyledTableCell align="right">
                        Transaction type
                      </StyledTableCell>
                      <StyledTableCell align="right">Debit</StyledTableCell>
                      <StyledTableCell align="right">Credit</StyledTableCell>
                      <StyledTableCell align="right">Balance</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsDetail.map((row) => {
                      const {
                        confirmed_date = "",
                        order_id = "",
                        order_code = "",
                        transaction_type = "",
                        debit = 0,
                        credit = 0,
                        balance = 0,
                      } = row;
                      return (
                        <StyledTableRow key={order_id}>
                          <StyledTableCell component="th" scope="row">
                            {confirmed_date}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {order_id}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {order_code}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {transaction_type}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {debit}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <ExchangeRate
                              balance={credit}
                              exchange={exchange}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <ExchangeRate
                              balance={balance}
                              exchange={exchange}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default AccountDetail;
