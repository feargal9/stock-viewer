/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { useState, useEffect, useCallback } from 'react';
import { api } from '../../utils';

const BASE_URL = 'https://cloud.iexapis.com/stable';
// eslint-disable-next-line no-undef
const API_TOKEN = process.env.REACT_APP_API_KEY;

export interface StockType {
  companyName?: string;
  description?: string;
  latestPrice?: number;
  name?: string;
  symbol: string;
}

interface StockState {
  [key: string]: StockType;
}

interface StocksData {
  favouriteSymbols: string[];
  getStockSymbols(): void;
  getStockBySymbol(symbol: string): void;
  symbolsError: string;
  stockError: string;
  isLoadingSymbols: boolean;
  isLoadingStock: boolean;
  selectedSymbol: string;
  setFavouriteSymbol(symbol: string): void;
  setSelectedSymbol(symbol: string): void;
  stockSymbols: StockType[];
  stockStats: StockState;
}

const useStocks = (): StocksData => {
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [stockSymbols, setStockSymbols] = useState<StockType[]>([]);
  const [stockStats, setStockStats] = useState<StockState>({});
  const [favouriteSymbols, setFavouriteSymbols] = useState<string[]>([]);
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [isLoadingStock, setIsLoadingStock] = useState(false);
  const [symbolsError, setSymbolsError] = useState('');
  const [stockError, setStockError] = useState('');

  const onSetFavouriteSymbol = (symbol: string): void => {
    const isCurrentFavourite = favouriteSymbols.includes(symbol);

    const updatedFavouriteSymbols = isCurrentFavourite
      ? favouriteSymbols.filter(favSymbol => favSymbol !== symbol)
      : [...favouriteSymbols, symbol];

    setFavouriteSymbols(updatedFavouriteSymbols);
  };

  const getStockSymbols = useCallback(async () => {
    const SYMBOLS_LIST_PATH = 'ref-data/symbols';
    const reqUrl = `${BASE_URL}/${SYMBOLS_LIST_PATH}?token=${API_TOKEN}`;

    try {
      setIsLoadingSymbols(true);

      const stockSymbolList: StockType[] = await api(reqUrl);

      setIsLoadingSymbols(false);
      setStockSymbols(stockSymbolList);
    } catch (response) {
      setSymbolsError(response.message);
      setIsLoadingSymbols(false);
    }
  }, []);

  const getStockBySymbol = useCallback((symbol: string) => {
    setSelectedSymbol(symbol);
  }, []);

  const getStockBySymbolAsync = useCallback(async () => {
    const COMPANY_PATH = (symbol: string): string => `stock/${symbol}/company`;
    const STOCK_QUOTE_PATH = (symbol: string): string =>
      `stock/${symbol}/quote`;

    const companyReqUrl = `${BASE_URL}/${COMPANY_PATH(
      selectedSymbol
    )}?token=${API_TOKEN}`;
    const stockQuoteReqUrl = `${BASE_URL}/${STOCK_QUOTE_PATH(
      selectedSymbol
    )}?token=${API_TOKEN}`;

    try {
      setIsLoadingStock(true);

      const requests: [Promise<StockType>, Promise<StockType>] = [
        api(companyReqUrl),
        api(stockQuoteReqUrl)
      ];

      const response: any = await Promise.all(requests).then(
        (results: any[]) => {
          const companyResponse: StockType = results[0];
          const stockQuoteResponse: StockType = results[1];
          return {
            ...companyResponse,
            ...stockQuoteResponse
          };
        }
      );

      setIsLoadingStock(false);
      setStockStats({ ...stockStats, [response.symbol]: response });
    } catch (error) {
      setStockError(error.message);
      setIsLoadingStock(false);
    }
  }, [stockStats, selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol && !stockSymbols) {
      getStockSymbols();
    }
  }, [stockSymbols, getStockSymbols, selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol && !stockStats[selectedSymbol]) {
      getStockBySymbolAsync();
    }
  }, [getStockBySymbolAsync, selectedSymbol, stockStats]);

  return {
    favouriteSymbols,
    getStockSymbols,
    getStockBySymbol,
    symbolsError,
    stockError,
    isLoadingSymbols,
    isLoadingStock,
    selectedSymbol,
    setFavouriteSymbol: onSetFavouriteSymbol,
    setSelectedSymbol,
    stockSymbols,
    stockStats
  };
};

export default useStocks;
