import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "rebass";
import { CSSTransition } from "react-transition-group";
import stockService from "../../services/stocks";

import { Loader, Select } from "../../components";
import StockItem from "./StockItem";

const { useStocks } = stockService;


const StockView: React.FC = () => {
  const { isLoadingSymbols, isLoadingStock, isError, getStockSymbols, getStockBySymbol, stockSymbols, stockStats } = useStocks();

  useEffect(() => {
    getStockSymbols();
  }, []);

  const formattedStockSymbols = stockSymbols.slice(0, 500).map(({ name = "", symbol = "" }) => ({
    label: name,
    value: symbol
  }));
  const initialValue: any = formattedStockSymbols && formattedStockSymbols.length ? formattedStockSymbols[0] : "";

  const [selectedSymbol, setSelectedSymbol] = useState(initialValue);

  useEffect(() => {
    if (selectedSymbol.value) {
      getStockBySymbol(selectedSymbol.value);
    }
  }, [selectedSymbol]);

  if (isLoadingSymbols) {
    return (
      <Flex alignItems="center" justifyContent="center" bg="text" height="100%" p={4}>
        <Loader />
      </Flex>
    )
  }

  const handleChange = (newValue: string, actionMeta: any) => {
    setSelectedSymbol(newValue);
  };

  const isEmptyStock = !stockStats || !stockStats.companyName;
  console.log("isEmptyStock", isEmptyStock);

  return (
    <React.Fragment>
      <Flex alignItems="center" flexDirection="column" justifyContent="space-evenly" bg="text" height="100%" p={4}>
        <Box width={1 / 2}>
          <Text fontSize={3} color="gray" mb={2}>Choose a stock below</Text>
          <Select
            placeholder="Select a stock"
            value={selectedSymbol}
            name="stock-symbol-select"
            onChange={handleChange}
            options={formattedStockSymbols}
          />
          {(isLoadingStock) && (
            <Flex alignItems="center" justifyContent="center" bg="text" height="100%" p={4}>
              <Loader message="Stocks loading" />
            </Flex>
          )}

          {!isLoadingStock && !isEmptyStock && (
            <StockItem stock={stockStats} />
          )}
        </Box>
        <Flex width={1} flexDirection="row" justifyContent="center" alignItems="center">
          <Box p={2} width={1} sx={{ minWidth: "400px", minHeight: "125px", border: "1px solid red" }}>
            Stuff
          </Box>
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

export default StockView;