import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { InlineIcon } from "@iconify/react";
import bitcoinIcon from "@iconify/icons-mdi/bitcoin";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import AccountBalanceList from "./AccountBalanceList";
import AccountDetail from "./AccountDetail";

const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles((theme) => ({
  labelRate: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',
    color: 'grey'
  },
  toolbar:{
    backgroundColor: theme.palette.action.hover,
    color: '#5DC19A',
    margin: 10

  }
}));


const MainApp = () => {
  const classes = useStyles();
  const [exchange, setExchange] = useState(0);
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  const [rowId, setRowId] = useState('');
  const REFRESH = 15000;

  const handleShowDetail = (rowId: string) => {
    setRowId(rowId);
    toggleIsModalOpen(!isModalOpen);
  };

  const startSocketLoop = (socket: any) => {
    setInterval(() => {
      socket.emit("getRate");
    }, REFRESH);
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("setExchange", (data: any) => {
      setExchange(data.exchange);
    });
    startSocketLoop(socket);
    return () => socket.disconnect();
  }, []);

  const handleModalClose = () => {
    toggleIsModalOpen(!isModalOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {exchange === 0 ? (
            <CircularProgress />
          ) : (
            <div className={classes.labelRate}>
              <span role="img">
                <InlineIcon icon={bitcoinIcon} />: ${exchange}
              </span>
            </div>
          )}
        </Toolbar>
        <AccountBalanceList
          exchange={exchange}
          handleDetail={handleShowDetail}
        />
      </AppBar>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        onEscapeKeyDown={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {rowId ? <AccountDetail rowId={rowId} exchange={exchange}/> : <CircularProgress />}
      </Modal>
    </div>
  );
};

export default MainApp;
