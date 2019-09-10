import React from 'react';
import { Box, Flex, Text, Card } from 'rebass';
import { Icon } from 'react-icons-kit';
import { starEmpty } from 'react-icons-kit/icomoon/starEmpty';
import { starFull } from 'react-icons-kit/icomoon/starFull';

import { StockType } from '../../services/stocks';

interface StockItemProps<StockType> {
  isFavourited: boolean;
  stock: StockType;
  setFavouriteSymbols: (symbol: string) => void;
}

interface IconProps {
  active: boolean;
  setFavouriteSymbols: (symbol: string) => void;
  symbol: string;
}

const StarIcon: React.FC<IconProps> = ({
  active = false,
  setFavouriteSymbols,
  symbol
}) => {
  const icon = active ? starFull : starEmpty;
  return (
    <Box
      onClick={(): void => setFavouriteSymbols(symbol)}
      color="muted"
      sx={{ cursor: 'pointer' }}
    >
      <Icon size={32} icon={icon} />
    </Box>
  );
};

const StockItem: React.FC<StockItemProps<StockType>> = ({
  isFavourited = false,
  stock,
  setFavouriteSymbols
}) => {
  return (
    <Card
      bg="background"
      mt={4}
      p={3}
      sx={{
        minHeight: '150px',
        width: '100%',
        border: '1px solid',
        borderColor: 'gray',
        borderRadius: '5px',
        boxShadow: 'none'
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Flex flexDirection="row" justifyContent="space-between" width={1}>
          <Box mb={3}>
            <Text fontWeight="bold" color="text">
              Symbol
            </Text>
            <Text as="p" data-testid="stock-symbol" color="text">
              {stock.symbol}
            </Text>
          </Box>
          <StarIcon
            active={isFavourited}
            symbol={stock.symbol}
            setFavouriteSymbols={setFavouriteSymbols}
          />
        </Flex>
        <Box mb={3}>
          <Text fontWeight="bold" color="text">
            Current stock price
          </Text>
          <Text data-testid="stock-price" color="text">
            {stock.latestPrice}
          </Text>
        </Box>
        <Box mb={3}>
          <Text fontWeight="bold" color="text">
            Company description
          </Text>
          <Text data-testid="stock-description" color="text">
            {stock.description}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default StockItem;
