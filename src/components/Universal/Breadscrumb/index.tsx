import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadScrumbs({
  page = "Home",
  subPage,
  destination,
}: {
  page: string;
  subPage: string;
  destination: string;
}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs separator="›" className="breadcrumbs-wrapper">
        <Link className="breadcrumbs-link" color="inherit" href="/">
          {page}
        </Link>
        <Link
          className="breadcrumbs-link"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          {subPage}
        </Link>
        <Typography
          sx={{ color: "text.primary" }}
          className="breadcrumbs-destination"
        >
          {destination}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
