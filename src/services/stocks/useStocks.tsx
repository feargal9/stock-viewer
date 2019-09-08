import { useState, useEffect, useCallback } from "react";
import { api } from "../../utils";

const BASE_URL = "https://cloud.iexapis.com/stable";
const API_TOKEN = process.env.REACT_APP_API_KEY;

export interface IStock {
  companyName?: string;
  description?: string;
  latestPrice?: number;
  name?: string;
  symbol: Symbol;
}

type Symbol = string;

interface StockState {
  [key: string]: IStock
}

const useStocks = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [stockSymbols, setStockSymbols] = useState<IStock[]>([]);
  const [stockStats, setStockStats] = useState<StockState>({});
  const [favouriteSymbols, setFavouriteSymbols] = useState<Symbol[]>([]);
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [isLoadingStock, setIsLoadingStock] = useState(false);
  const [isError, setIsError] = useState(false);

  const getStockSymbols = useCallback(async () => {
    const SYMBOLS_LIST_PATH = "ref-data/symbols";
    const reqUrl = `${BASE_URL}/${SYMBOLS_LIST_PATH}?token=${API_TOKEN}`;

    try {
      setIsLoadingSymbols(true);

      const stockSymbolList: IStock[] = await api(reqUrl);

      setIsLoadingSymbols(false);
      setStockSymbols(stockSymbolList);
    } catch (response) {
      setIsError(true);
      setIsLoadingSymbols(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSymbol && !stockSymbols) {
      getStockSymbols();
    }
  }, [stockSymbols, getStockSymbols, selectedSymbol]);

  const getStockBySymbol = useCallback((symbol: string) => {
    setSelectedSymbol(symbol);
  }, []);

  const getStockBySymbolAsync = useCallback(async () => {
    const COMPANY_PATH = (symbol: string) => `stock/${symbol}/company`;
    const STOCK_QUOTE_PATH = (symbol: string) => `stock/${symbol}/quote`;

    const companyReqUrl = `${BASE_URL}/${COMPANY_PATH(selectedSymbol)}?token=${API_TOKEN}`;
    const stockQuoteReqUrl = `${BASE_URL}/${STOCK_QUOTE_PATH(selectedSymbol)}?token=${API_TOKEN}`;

    try {
      setIsLoadingStock(true);

      const requests: [Promise<IStock>, Promise<IStock>] = [api(companyReqUrl), api(stockQuoteReqUrl)];
      const response: any = await Promise.all(requests).then((results: any[]) => {
        const companyResponse: IStock = results[0];
        const stockQuoteResponse: IStock = results[1];
        return {
          ...companyResponse,
          ...stockQuoteResponse
        };
      });

      setIsLoadingStock(false);
      setStockStats({ ...stockStats, [response.symbol]: response });
    } catch (error) {
      setIsError(true);
      setIsLoadingStock(false);
    }
  }, [stockStats, selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol && !stockStats[selectedSymbol]) {
      getStockBySymbolAsync();
    }
  }, [getStockBySymbolAsync, selectedSymbol, stockStats]);

  const onSetFavouriteSymbol = (symbol: Symbol) => {
    const isCurrentFavourite = favouriteSymbols.includes(symbol);

    const updatedFavouriteSymbols = isCurrentFavourite
      ? favouriteSymbols.filter(favSymbol => favSymbol !== symbol)
      : [...favouriteSymbols, symbol];

    setFavouriteSymbols(updatedFavouriteSymbols);
  };

  return {
    getStockSymbols,
    getStockBySymbol,
    favouriteSymbols,
    setFavouriteSymbol: onSetFavouriteSymbol,
    selectedSymbol,
    setSelectedSymbol,
    isError,
    isLoadingSymbols,
    isLoadingStock,
    stockSymbols,
    stockStats
  }
}

export default useStocks;