import React from "react";
import type { SxProps} from "@mui/material";
import {Box, Grow} from "@mui/material";

interface SectionProps {
    name: string;
    children: React.ReactNode;
    render: boolean;
    sx?: SxProps;
}

export default function Section(
    {name, children, render, sx}: SectionProps
) {
    return (
        <Box id={name} component={"section"} sx={{
            minHeight: "100svh",
            display: "flex",
            maxWidth: "100svw",
            ...sx
        }}>
            <>

                <Grow in={
                    render
                } style={{ transitionDelay: render ? '100ms' : '0ms' }}>
                    <Box sx={{
                        minHeight: "100svh",
                        display: "flex",
                        width: "100%",
                    }}>
                        {children}
                    </Box>
                </Grow>
            </>
        </Box>
    )
}