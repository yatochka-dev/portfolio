import Section from "../Section";
import {Box, ButtonGroup, Container, FormControl, Paper, TextField} from "@mui/material";
import useSection from "../../../hooks/useSection";
import TextBox from "../../TextBox";
import {useForm} from "@mantine/form";
import {useRef, useState} from "react";
import {useDisclosure, useTimeout} from "@mantine/hooks";
import LoadingButton from '@mui/lab/LoadingButton';
import {LoadingDotsAnimation} from "../../helpers/LoadingDotsAnimation";
import {Footer} from "../../Footer";
import {char, createRegExp, letter} from "magic-regexp";
import type {ContactForm} from "../../../pages/api/contact";
import dynamic from "next/dynamic";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {ssr: false});

export default function Contact() {

    const regex = createRegExp(
        letter.times.between(1, 100)
    )

    const {
        getInputProps: register,
        reset,
        onSubmit
    } = useForm(
        {
            initialValues: {
                workEmail: "",
                firstName: "",
                lastName: "",
                message: "",
            },
            validate: {
                workEmail: (value) => {
                    if (!value) return "This field is required";
                },
                firstName: (value) => {
                    if (!regex.test(value)) return "First name is not valid";
                },
                lastName: (value) => {
                    if (!regex.test(value)) return "Last name is not valid";
                },
                message: (value) => {
                    if (!value) return "This field is required";
                    const messageRegex = createRegExp(
                        char.times.atLeast(12)
                    )
                    if (!messageRegex.test(value)) return "Message must be at least 12 character long";
                }
            }
        }
    );


    function registerInput(path: string, helperText?: string) {

        const old = register(path, {withFocus: false, type: "input"});

        // if error is not null(is string), need to replace it with boolean value, and add helpText prop that contains error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {error, ...rest} = old;


        return {
            ...rest,
            error: !!error,
            helperText: !!error ? error as string : helperText ?? "",
        } as {
            error: boolean,
            helperText: string,
            value: string,
            onChange: (e: never) => void,
            onBlur: () => void,
            onFocus: () => void,
            name: string,
        }
    }

    const recaptchaRef = useRef();

    const [loading, handleLoading] = useDisclosure(false);
    const [message, setMessage] = useState<{ t: string, ok: boolean } | null>(null);

    const {start: clearMessage} = useTimeout(
        () => {
            setMessage(null)
        },
        4500
    )

    const handleSend = (values: ContactForm) => {

        if (!captchaChecked) {
            setMessage({t: "Please check the captcha.", ok: false})
            clearMessage();
            return;
        }


        async function cMail() {
            handleLoading.open()

            if (!!recaptchaRef && !!recaptchaRef.current) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                recaptchaRef.current.reset();
            }
            const data = await fetch(
                "/api/contact",
                {
                    method: "POST",
                    body: JSON.stringify(values)

                }
            )
            handleLoading.close()

            if (data.ok) {
                setMessage({t: "Message sent! I'll get back to you as soon as possible.", ok: true})
                reset()
            } else {
                setMessage(
                    {
                        t: "Something went wrong. Please try again later.",
                        ok: false
                    }
                )
            }

            clearMessage();
        }

        cMail().catch(console.error);


    }

    const disabled = loading;

    const [captchaChecked, setCaptchaChecked] = useState(false);

    return (
        <Section name={"contact"} render={"contact" === useSection().name}>

            <Box sx={{
                width: "100%",
                flexDirection: "column",
                display: "flex",
            }}>
                <Container>
                    <Box sx={{
                        display: "flex",
                        minHeight: "100svh",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}>

                        <Paper variant={"outlined"}>
                            <Box sx={{
                                p: 4,
                                width: "600px",
                                '& > [class*="formcontrol" i]': {
                                    my: .8
                                }
                            }} component={"form"} onSubmit={
                                onSubmit(values => handleSend(values))
                            }>
                                <Box>
                                    <TextBox variant={"h4"}>
                                        Contact Me
                                    </TextBox>
                                    {
                                        message && <TextBox variant={"subtitle1"} color={
                                            message.ok ? "success" : "error"
                                        } sx={{
                                            color: message.ok ? "success.main" : "error.main"
                                        }}>
                                            {message.t}
                                        </TextBox>
                                    }
                                </Box>

                                <FormControl sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 3
                                }}>
                                    <TextField
                                        label={"First name"} {...registerInput('firstName', "Your first name")}
                                        fullWidth disabled={disabled}/>
                                    <TextField
                                        label={"Last name"} {...registerInput('lastName', "Your last name")}
                                        fullWidth
                                        disabled={disabled}/>
                                </FormControl>

                                <FormControl fullWidth>

                                    <TextField label={"Work Email"}
                                               type={"email"} {...registerInput('workEmail', "Email that I can reach you at")}
                                               disabled={disabled}/>

                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField label={"Message"} multiline
                                               maxRows={6} {...registerInput('message', "Your message")}
                                               disabled={disabled}/>
                                </FormControl>
                                <FormControl>
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    <ReCAPTCHA
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        ref={recaptchaRef}
                                        size={"normal"}
                                        sitekey={"6Ldj4aQkAAAAAL6b0_JLRyEqRcKUlxdJgEDiCATI"}
                                        onChange={(token) => {
                                            if (!token) {
                                                setCaptchaChecked(false);
                                            }
                                            setCaptchaChecked(true);
                                        }}
                                     />
                                </FormControl>
                                <ButtonGroup fullWidth sx={{
                                    mt: 2
                                }}>
                                    <LoadingButton color={
                                        "primary"
                                    } type={"submit"} loading={loading} loadingPosition={"center"}
                                                   loadingIndicator={<LoadingDotsAnimation
                                                       message={"sending"}/>} sx={{
                                        textTransform: loading ? "capitalize" : "uppercase"
                                    }} variant={"contained"}>
                                        <span>Send</span>
                                    </LoadingButton>
                                </ButtonGroup>
                            </Box>
                        </Paper>
                        <Box sx={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",

                        }}>
                            <Footer/>
                        </Box>

                    </Box>
                </Container>
            </Box>
        </Section>
    )
}