import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  balance: number;
  exchange: number;
}

const ExchangeRate = ({ balance = 0, exchange = 0 }: Props) => {
  const evalExchangeRate = (balance: number) => (balance * exchange).toFixed(2);
  return (
    <>
      {exchange === 0 ? (
        <CircularProgress />
      ) : (
        <div>
          {balance}
          <br />${evalExchangeRate(balance)} BTC
        </div>
      )}
    </>
  );
};

export default ExchangeRate;
