import { formatNumber } from "~/shared/intl";

describe("formatNumber", () => {
  it("formats numeric strings for the locale", () => {
    expect(formatNumber("93", "en")).toBe("93");
  });

  it("renders the requested numbering system (digit localization)", () => {
    // Options flow through, so non-Latin digit systems render when specified.
    // (Per CLDR 44+, plain "ar" now defaults to Latin digits, so we request
    // the Arabic-Indic system explicitly here.)
    expect(formatNumber("100", "ar", { numberingSystem: "arab" })).toBe("١٠٠");
  });

  it("can suppress grouping (e.g. for years)", () => {
    expect(formatNumber("2008", "en")).toBe("2,008");
    expect(formatNumber("2008", "en", { useGrouping: false })).toBe("2008");
  });

  it("returns non-numeric values unchanged", () => {
    expect(formatNumber("N/A", "en")).toBe("N/A");
  });
});
