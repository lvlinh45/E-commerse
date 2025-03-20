import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export default function BreadScrumbs({
  page = "Home",
  subPage,
  destination,
  navigateSubPage,
}: {
  page: string;
  subPage?: string;
  destination: string;
  navigateSubPage?: string;
}) {
  const navigate = useNavigate();
  return (
    <div role="presentation">
      <Breadcrumbs separator="›" className="breadcrumbs-wrapper">
        <Link className="breadcrumbs-link" color="inherit" href="/">
          {page}
        </Link>
        {subPage && (
          <p
            className="breadcrumbs-link"
            color="inherit"
            onClick={() => navigate(`/${navigateSubPage}`)}
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
