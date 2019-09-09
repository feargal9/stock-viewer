import { renderHook, act } from '@testing-library/react-hooks';
import useStocks from "../useStocks";

describe("useStocks", () => {
  test("sets isLoadingSymbols to true when getStockSymbols is called", () => {
    const { result } = renderHook(() => useStocks());

    act(() => {
      result.current.getStockSymbols();
    });
    expect(result.current.isLoadingSymbols).toEqual(true);
  });

  test("sets isLoadingSymbols to true when getStockSymbols is called", () => {
    const { result } = renderHook(() => useStocks());

    act(() => {
      result.current.getStockBySymbol("AAPL");
    });
    expect(result.current.isLoadingStock).toEqual(true);
  });
});