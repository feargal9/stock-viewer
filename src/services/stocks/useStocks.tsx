import React, { useState } from "react";
import { api } from "../../utils";

const BASE_URL = "https://cloud.iexapis.com/stable";
const API_TOKEN = process.env.REACT_APP_API_KEY;

export interface IStock {
  companyName?: string;
  description?: string;
  latestPrice?: number;
  name?: string;
  symbol: string;
}

const useStocks = () => {
  const [stockSymbols, setStockSymbols] = useState<IStock[]>([]);
  const [stockStats, setStockStats] = useState<IStock>({ companyName: "", symbol: "" });
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [isLoadingStock, setIsLoadingStock] = useState(false);
  const [isError, setIsError] = useState(false);

  const getStockSymbols = async () => {
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
  }

  const getStockBySymbol = async (symbol: string) => {
    const COMPANY_PATH = (symbol: string) => `stock/${symbol}/company`;
    const STOCK_QUOTE_PATH = (symbol: string) => `stock/${symbol}/quote`;
    const companyReqUrl = `${BASE_URL}/${COMPANY_PATH(symbol)}?token=${API_TOKEN}`;
    const stockQuoteReqUrl = `${BASE_URL}/${STOCK_QUOTE_PATH(symbol)}?token=${API_TOKEN}`;

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
      setStockStats(response);
    } catch (error) {
      setIsError(true);
      setIsLoadingStock(false);
    }
  }

  return {
    getStockSymbols,
    getStockBySymbol,
    isError,
    isLoadingSymbols,
    isLoadingStock,
    stockSymbols,
    stockStats
  }
}

export default useStocks;