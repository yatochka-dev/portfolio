import React from "react";
import {Box, SxProps} from "@mui/material";

interface SectionProps {
    name: string;
    children: React.ReactNode;
    sx?: SxProps;

}

export default function Section(
    {name, children, sx}: SectionProps
) {
    return (
        <Box id={name} component={"section"} sx={{
            minHeight: "100svh",
            display: "flex",
            ...sx
        }}>
            {children}
        </Box>
    )
}