import { renderHook, act } from '@testing-library/react-hooks';
import useStocks from "../useStocks";

describe("useStocks", () => {
  test("loads symbols on mount", () => {
    const { result } = renderHook(() => useStocks());
    expect(result.current.isLoadingSymbols).toEqual(true);
  });

  test("sets isLoadingStock to true when selected symbol changes", () => {
    const { result } = renderHook(() => useStocks());

    act(() => {
      result.current.setSelectedSymbol("AAPL");
    });

    expect(result.current.isLoadingStock).toEqual(true);
  })
});