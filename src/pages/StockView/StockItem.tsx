import React from "react";
import { Box, Flex, Text, Card } from "rebass";

import { IStock } from "../../services/stocks";

interface StockItemProps<IStock> {
  stock: IStock
}

const StockItem: React.FC<StockItemProps<IStock>> = ({ stock }) => {
  console.log("stock", stock);
  return (
    <Card bg="text" mt={4} p={2} sx={{ minHeight: "150px", width: "100 % ", border: "1px solid", borderColor: "gray" }}
    >
      <Flex flexDirection="column" alignItems="flex-start" justifyContent="center">
        <Box>
          <Text fontWeight="bold" color="background">Symbol</Text>
          <Text color="background">{stock.symbol}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="background">Current stock price</Text>
          <Text color="background">{stock.latestPrice}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="background">Company description</Text>
          <Text color="background">{stock.description}</Text>
        </Box>
      </Flex >
    </Card >
  )
}

export default StockItem;