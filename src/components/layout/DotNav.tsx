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
            flexDirection: "column",
            position: "fixed",
            top: "50%",
            right: "0",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",

        }}>
            {sections.map(
                (section, index) => (
                    <Box key={index} sx={{
                        width: ".7rem",
                        height: ".7rem",
                        borderRadius: "50%",
                        backgroundColor: "text.secondary",
                        display: "inline-block",
                        margin: "0.5rem",
                        transition: "all 0.3s ease-in-out",
                        opacity: lastScrolledTo === section ? .5 : 1,
                        ":hover": {
                            opacity: .7,
                        }
                    }} onClick={() => handleClick(section)}/>
                )
            )}
        </Box>
    )
}

