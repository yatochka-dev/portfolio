import {createTheme} from "@mui/material";

const theme = createTheme({

    palette: {
        mode: "dark",

    },
    components: {
        MuiButtonGroup: {
            defaultProps: {
                variant: "contained",
            }
        },
        MuiButton: {
            defaultProps: {
                variant: "contained",
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: "standard",
            },
        }
    }

});

export default theme;