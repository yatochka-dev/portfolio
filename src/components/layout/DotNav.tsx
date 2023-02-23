import {Box} from "@mui/material";

interface DotNavProps {
    sections: string[];
    handleClick: (section: string) => void;
    lastScrolledTo: string;
}


export default function DotNav({sections, handleClick, lastScrolledTo}: DotNavProps) {


    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: {
                lg: "column",
                xs: "row",
            },
            position: "fixed",
            top: {
                lg: "50%",
                xs: "0",
            },
            right: {
                lg: "0",
                xs: "50%",
            },
            transform: {
                lg: "translate(-50%, -50%)",
                xs: "translate(50%, 0)",
            },
            zIndex: 1000,


        }}>
            {sections.map(
                (section, index) => (
                    <Box key={index} sx={{
                        width: {
                            lg: ".7rem",
                            xs: "1.1rem",
                        },
                        height: {
                            lg: ".7rem",
                            xs: "1.1rem",
                        },
                        zIndex: 1000,
                        borderRadius: "50%",
                        backgroundColor: "text.secondary",
                        display: "inline-block",
                        margin: "0.5rem",
                        transition: "all 0.3s ease-in-out",
                        opacity: lastScrolledTo === section ? .5 : 1,
                        ":hover": {
                            opacity: .7,
                        },
                        cursor: "pointer",

                    }} onClick={() => handleClick(section)}/>
                )
            )}
        </Box>
    )
}

