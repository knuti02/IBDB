import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function SearchResult() {
    const location = useLocation();

    return (
        <div>
            <Typography variant="h4">Søkeresultat: </Typography>
        </div>
    )
}