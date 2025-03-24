import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";

export default function BreadScrumbs({
  page = "Home",
  subPage,
  destination,
}: {
  page: string;
  subPage?: string;
  destination: string;
}) {
  const navigate = useNavigate();
  return (
    <div role="presentation">
      <Breadcrumbs separator="›" className="breadcrumbs-wrapper">
        <p
          className="breadcrumbs-link"
          color="inherit"
          onClick={() => navigate(`/`)}
        >
          {page}
        </p>
        {subPage && (
          <p
            className="breadcrumbs-link"
            color="inherit"
            onClick={() => navigate(`/collection/all`)}
          >
            {subPage}
          </p>
        )}
        {destination && (
          <Typography
            sx={{ color: "text.primary" }}
            className="breadcrumbs-destination"
          >
            {destination}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
