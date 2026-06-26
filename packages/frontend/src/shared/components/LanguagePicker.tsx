import { styled, TextField } from "@mui/material";
import { useMemo } from "react";
import { useLocale } from "~/i18n/LocaleProvider";

/** The language's name in its own language, e.g. "en" → "English", "fr" → "français". */
const languageLabel = (code: string) => {
  try {
    return new Intl.DisplayNames([code], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
};

export const LanguagePicker = () => {
  const { locale, supportedLocales, setLocale } = useLocale();

  const options = useMemo(
    () =>
      supportedLocales.map((code) => ({ code, label: languageLabel(code) })),
    [supportedLocales]
  );

  return (
    <Wrap>
      <TextField
        onChange={(event) => setLocale(event.target.value)}
        select
        size="small"
        slotProps={{
          select: { native: true },
          htmlInput: { "aria-label": "Language" },
        }}
        value={locale}
      >
        {options.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </TextField>
    </Wrap>
  );
};

const Wrap = styled("div")(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  insetInlineEnd: theme.spacing(2),
  zIndex: theme.zIndex.appBar,
  background: theme.palette.background.paper,
  borderRadius: 12,
  boxShadow: "0 6px 20px rgba(60, 80, 60, 0.18)",
}));
