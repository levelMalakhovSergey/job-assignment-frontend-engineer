import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats ISO date with ordinal suffix", () => {
    expect(formatDate("2024-01-01T12:00:00.000Z")).toMatch(/January 1st/);
    expect(formatDate("2024-01-02T12:00:00.000Z")).toMatch(/January 2nd/);
    expect(formatDate("2024-01-03T12:00:00.000Z")).toMatch(/January 3rd/);
    expect(formatDate("2024-01-11T12:00:00.000Z")).toMatch(/January 11th/);
  });
});
