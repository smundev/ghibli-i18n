import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ placeItems: "center" }}>
      404
      <Link to="/">
        <Button>{t("notFound.backHome")}</Button>
      </Link>
    </Box>
  );
};

export default NotFound;
