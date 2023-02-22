import {type AppType} from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import {SessionProvider} from "../lib/auth/SessionProvider";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../components/theme";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useScrollLock, useTimeout} from "@mantine/hooks";
import {Footer} from "../components/Footer";
import Head from "next/head";

const MyApp: AppType = ({Component, pageProps}) => {
    const router = useRouter();

    const {start: scrollToTop} = useTimeout(() => {
        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        )

    }, 120)

    useEffect(() => {
        scrollToTop()
    }, [router.asPath, scrollToTop]);

    const isMainPage = router.pathname === "/";

    useScrollLock(isMainPage, {disableBodyPadding: true});
    return (
        <>
            <Head>

                <title>Yat.dev</title>
                <meta name="description" content="Portfolio website of Yatochka(Philip Sagan"/>

                <meta property="og:title" content="Yat.dev"/>
                <meta property="og:description" content="Portfolio website of Yatochka(Philip Sagan"/>

            </Head>

            <ThemeProvider theme={theme}>
                <SessionProvider>
                    <CssBaseline/>

                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Box component={"heart"} sx={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}>
                        <Box display={"flex"}>

                            <Box sx={{
                                flex: "1 1 auto",
                            }}>

                                <Component {...pageProps} key={router.asPath}/>
                            </Box>

                        </Box>
                        {!isMainPage && <Footer/>}
                    </Box>
                </SessionProvider>
            </ThemeProvider>

        </>
    );
};

export default MyApp;
