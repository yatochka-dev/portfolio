import {type AppType} from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import {SessionProvider} from "../lib/auth/SessionProvider";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../components/theme";
import SideBar from "../components/SideBar";
import {AnimatePresence} from "framer-motion";
import Layout from "../components/layout/layout";
import {useRouter} from "next/router";

const MyApp: AppType = ({Component, pageProps}) => {
    const router = useRouter();

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <CssBaseline />

                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Box component={"heart"} sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}>
                    <Box display={"flex"}>

                        <AnimatePresence mode="wait" initial={false}
                                         onExitComplete={() => window.scrollTo(0, 0)}
                        >


                            <Layout>

                                <Component {...pageProps} key={router.asPath}/>
                            </Layout>

                        </AnimatePresence>


                    </Box>
                </Box>
            </SessionProvider>
        </ThemeProvider>
    );
};

export default MyApp;
