import React, { useEffect } from "react";
import { Box, Flex, Text } from "rebass";
import isEmpty from "lodash/isEmpty";

import { Loader, Select } from "../../components";
import { OptionType } from "../../components/Select";
import FavouriteStocks from "./FavouriteStocks";
import StockItem from "./StockItem";

import stockService from "../../services/stocks";

const { useStocks } = stockService;

const StockView: React.FC = () => {
  const {
    isLoadingSymbols,
    isLoadingStock,
    symbolsError,
    stockError,
    favouriteSymbols,
    setFavouriteSymbol,
    getStockSymbols,
    getStockBySymbol,
    stockSymbols,
    stockStats,
    selectedSymbol,
    setSelectedSymbol
  } = useStocks();

  useEffect(() => {
    getStockSymbols();
  }, [getStockSymbols]);

  if (isLoadingSymbols) {
    return (
      <Flex alignItems="center" justifyContent="center" bg="background" height="100%" p={4}>
        <Loader />
      </Flex>
    )
  }

  if (symbolsError) {
    return (
      <Flex alignItems="center" justifyContent="center" bg="background" height="100%" p={4} >
        <Text color="error">{symbolsError}</Text>
      </Flex >
    )
  }

  const handleChange = (option: OptionType, actionMeta: any) => {
    if (option.value && !stockStats[option.value]) {
      getStockBySymbol(option.value);
    }
  }

  const handleSetFavouriteSymbol = (symbol: string) => {
    setFavouriteSymbol(symbol);
  }

  const handleClickFavourite = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const formattedStockSymbols = stockSymbols.map(({ name = "", symbol = "" }) => ({
    label: symbol,
    value: symbol
  }));
  const isEmptyStock = !stockStats || !selectedSymbol || !stockStats[selectedSymbol];

  return (
    <React.Fragment>
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="space-evenly"
        bg="background"
        height="100%"
        p={4}
      >
        <Box width={[1, 3 / 4]}>
          {!isEmpty(favouriteSymbols) && (
            <React.Fragment>
              <Text color="muted">Favourite stocks:</Text>
              <FavouriteStocks onClickFavourite={handleClickFavourite} favouriteStocks={favouriteSymbols} />
            </React.Fragment>
          )}
          <Text fontSize={3} color="muted" mb={2}>Choose a stock below</Text>
          <Select
            placeholder="Select a stock"
            value={selectedSymbol}
            name="stock-symbol-select"
            onChange={handleChange}
            options={formattedStockSymbols}
          />
          {(isLoadingStock) && (
            <Flex alignItems="center" justifyContent="center" bg="background" height="100%" p={4}>
              <Loader message="Stocks loading" />
            </Flex>
          )}
          {stockError && (
            <Flex alignItems="center" justifyContent="center" bg="background" height="100%" p={4}>
              <Text color="error">{stockError}</Text>
            </Flex>
          )}
          {!isLoadingStock && !isEmptyStock && (
            <StockItem
              isFavourited={favouriteSymbols.includes(selectedSymbol)}
              stock={stockStats[selectedSymbol]}
              setFavouriteSymbols={handleSetFavouriteSymbol}
            />
          )}
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default StockView;