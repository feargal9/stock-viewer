import React from "react";
import { Box, Flex, Text, Card } from "rebass";
import { Icon } from "react-icons-kit";
import { starEmpty } from 'react-icons-kit/icomoon/starEmpty';
import { starFull } from 'react-icons-kit/icomoon/starFull';

import { IStock } from "../../services/stocks";

interface StockItemProps<IStock> {
  isFavourited: boolean;
  stock: IStock;
  setFavouriteSymbols: (symbol: string) => void;
}

interface IconProps {
  active: boolean;
  setFavouriteSymbols: (symbol: string) => void;
  symbol: string;
}

const StarIcon: React.FC<IconProps> = ({ active = false, setFavouriteSymbols, symbol }) => {
  const icon = active ? starFull : starEmpty;
  return (
    <Box
      onClick={() => setFavouriteSymbols(symbol)}
      color="muted"
      sx={{ cursor: "pointer" }}
    >
      <Icon size={32} icon={icon} />
    </Box>
  )
}

const StockItem: React.FC<StockItemProps<IStock>> = ({
  isFavourited = false,
  stock,
  setFavouriteSymbols
}) => {
  return (
    <Card
      bg="text"
      mt={4}
      p={3}
      sx={{
        minHeight: "150px",
        width: "100%",
        border: "1px solid",
        borderColor: "gray",
        borderRadius: "5px",
        boxShadow: "none"
      }}
    >
      <Flex flexDirection="column" alignItems="flex-start" justifyContent="center">
        <Flex flexDirection="row" justifyContent="space-between" width={1}>
          <Box mb={3}>
            <Text fontWeight="bold" color="background">Symbol</Text>
            <Text color="background">{stock.symbol}</Text>
          </Box>
          <StarIcon
            active={isFavourited}
            symbol={stock.symbol}
            setFavouriteSymbols={setFavouriteSymbols}
          />
        </Flex>
        <Box mb={3}>
          <Text fontWeight="bold" color="background">Current stock price</Text>
          <Text color="background">{stock.latestPrice}</Text>
        </Box>
        <Box mb={3}>
          <Text fontWeight="bold" color="background">Company description</Text>
          <Text color="background">{stock.description}</Text>
        </Box>
      </Flex >
    </Card >
  )
}

export default StockItem;