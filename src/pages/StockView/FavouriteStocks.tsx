import React from "react";
import { Box, Flex, Text, Card } from "rebass";

interface ListProps {
  favouriteStocks: string[];
  onClickFavourite(symbol: string): void;
}

interface ItemProps {
  onClick(symbol: string): void;
  stock: string;
}

const FavStockItem: React.FC<ItemProps> = ({ onClick, stock }) => {
  return (
    <Box
      onClick={() => onClick(stock)}
      bg="text"
      as="button"
      mr={1}
      sx={{ height: "15px", border: "1px solid", borderColor: "primary", cursor: "pointer" }}
    >
      <Text>{stock}</Text>
    </Box>
  )
}

const FavouriteStocks: React.FC<ListProps> = ({ onClickFavourite, favouriteStocks = [] }) => {
  return (
    <Card
      bg="text"
      p={2}
      mb={4}
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "gray",
        borderRadius: "5px",
        boxShadow: "none"
      }}
    >
      <Flex flexDirection="row" width={1} justifyContent="flex-start" alignItems="center">
        <Flex flexDirection="row" alignItems="center" width={1} flexWrap="wrap">
          {favouriteStocks.map(stock =>
            <FavStockItem
              key={stock}
              onClick={onClickFavourite}
              stock={stock}
            />
          )}
        </Flex>
      </Flex>
    </Card >
  )
}

export default FavouriteStocks;