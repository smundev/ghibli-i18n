import { fireEvent, render, screen } from "@testing-library/react";
import { LocaleProvider } from "~/i18n/LocaleProvider";
import { LanguagePicker } from "./LanguagePicker";

describe("LanguagePicker", () => {
  it("switches locale, updating document lang/dir and persistence", () => {
    localStorage.clear();

    render(
      <LocaleProvider>
        <LanguagePicker />
      </LocaleProvider>
    );

    const select = screen.getByRole("combobox", { name: "Language" });
    expect(select).toHaveValue("en");
    expect(document.documentElement.lang).toBe("en");

    fireEvent.change(select, { target: { value: "es" } });
    expect(select).toHaveValue("es");
    expect(document.documentElement.lang).toBe("es");
    expect(document.documentElement.dir).toBe("ltr");
    expect(localStorage.getItem("ghibli-locale")).toBe("es");

    // Arabic flips the document to right-to-left.
    fireEvent.change(select, { target: { value: "ar" } });
    expect(document.documentElement.dir).toBe("rtl");
  });

  it("localizes the document meta description", () => {
    localStorage.clear();
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);

    render(
      <LocaleProvider>
        <LanguagePicker />
      </LocaleProvider>
    );

    // Drive locales explicitly — the i18n singleton carries state across tests.
    const select = screen.getByRole("combobox", { name: "Language" });

    fireEvent.change(select, { target: { value: "en" } });
    expect(meta.getAttribute("content")).toContain("Explore the films");

    fireEvent.change(select, { target: { value: "es" } });
    expect(meta.getAttribute("content")).toContain("Explora las películas");

    meta.remove();
  });
});
