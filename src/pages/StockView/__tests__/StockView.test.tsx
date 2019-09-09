import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
  wait
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const { fetchMock } = require("@react-mock/fetch");

import StockView from "../StockView";

const SYMBOLS_REQUEST = (url: string) => url.includes("/symbols");
const COMPANY_REQUEST = (url: string) => url.includes("/company");
const QUOTE_REQUEST = (url: string) => url.includes("/quote");

const SYMBOLS_RESPONSE = [{ symbol: "AAPL" }];
const COMPANY_RESPONSE = {
  symbol: "AAPL",
  companyName: "",
  description: "Apple Inc."
};
const QUOTE_RESPONSE = {
  symbol: "AAPL",
  latestPrice: "356.82"
};


afterEach(() => {
  cleanup();
  fetchMock.restore();
});

jest.mock("react-virtualized-select", () => ({ options, value, onChange }: any) => {
  function handleChange(event: any) {
    const option = options.find(
      (option: any) => option.value === event.currentTarget.value
    );
    onChange(option);
  }
  return (
    <select data-testid="select" value={value} onChange={handleChange}>
      {options.map(({ label, value }: any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

function renderComponent(matcher: (url: string) => boolean, fetchResponse: any, options?: any) {
  fetchMock.mock(matcher, fetchResponse, { name: options.name });
  return render(
    <StockView />
  )
}

describe("Stock View", () => {
  it("renders a spinner when fetching symbols data", async () => {
    const { queryByTestId } = renderComponent(SYMBOLS_REQUEST, [], { name: "symbols-path" });
    await wait(() => {
      expect(queryByTestId("loader")).toBeDefined();
      expect(fetchMock.calls("symbols-path")).toHaveLength(1);
    });
  });

  it("renders a dropdown with response from symbols request as the options", async () => {
    const { queryByTestId } = renderComponent(SYMBOLS_REQUEST, SYMBOLS_RESPONSE, { name: "symbols-path" });
    await waitForElementToBeRemoved(() => queryByTestId("loader"));
    await wait(() => {
      expect(queryByTestId("select-dropdown")).toBeDefined();
    });
  });

  it("changing dropdown value triggers fetch and displays stock info", async () => {
    const {
      getByTestId,
      queryByTestId
    } = renderComponent(SYMBOLS_REQUEST, SYMBOLS_RESPONSE, {});

    fetchMock.mock(COMPANY_REQUEST, COMPANY_RESPONSE, { name: "company-path" });
    fetchMock.mock(QUOTE_REQUEST, QUOTE_RESPONSE, { name: "quote-path" });

    await waitForElementToBeRemoved(() => queryByTestId("loader"));

    await wait(() => {
      fireEvent.change(getByTestId("select"), {
        target: {
          value: "AAPL",
        },
      });

      const input = getByTestId("select") as HTMLInputElement;
      expect(input.value).toEqual("AAPL");

    });

    expect(fetchMock.calls("company-path")).toHaveLength(1);
    expect(fetchMock.calls("quote-path")).toHaveLength(1);

    await waitForElement(() => queryByTestId("stock-symbol"));

    expect(getByTestId("stock-symbol").textContent).toEqual("AAPL");
    expect(getByTestId("stock-price").textContent).toEqual("356.82");
    expect(getByTestId("stock-description").textContent).toEqual("Apple Inc.");
  });
})