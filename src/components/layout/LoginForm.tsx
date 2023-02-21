import {Box, Button, ButtonGroup, FormControl, IconButton, Paper, TextField} from "@mui/material";

import {useForm} from "@mantine/form";

import {useId, useToggle} from '@mantine/hooks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useSession, {signIn} from "../../lib/auth/useSession";
import TextBox from "../TextBox";


export default function LoginForm() {
    const {
        session,
        status,
    } = useSession();

    const uuid1 = useId("email-login-field");
    const uuid2 = useId("password-login-field");

    // const credentials = {
    //     usernameOrEmail: "philipchef13@gmail.com",
    //     password: "U2nDKiREvt6ZL2L",
    // }


    const form = useForm({
        initialValues: {
            emailOrUsername: '',
            password: "",
        },

        validate: {
            password: (value) => "Error"
        },
    });

    console.log(form.getInputProps("password"))

    const [passwordInputType, toggle] = useToggle(
        ["password", "text"]
    );


    return (
        <>
            <Paper variant={"outlined"} sx={{
                width: "400px",

            }}>
                <Box component={"form"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: 2,
                }}>
                    <TextBox variant={"h4"} textAlign={"center"}>Login Form</TextBox>


                    <FormControl>
                        <TextField type={"email"} id={uuid1}
                                   label={"Email or username"} {...form.getInputProps("emailOrUsername")} />

                    </FormControl>
                    <FormControl>
                        <TextField type={passwordInputType} id={uuid2} label={"Password"}
                                   InputProps={{
                                       endAdornment: <IconButton onClick={() => toggle()}>
                                           {passwordInputType === "text" ? <VisibilityOffIcon/> :
                                               <VisibilityIcon/>}
                                       </IconButton>
                                   }} {...form.getInputProps("password")}/>

                    </FormControl>
                    <Box display={"flex"}>
                        <ButtonGroup fullWidth>
                            <Button onClick={() => void signIn(
                                {
                                    usernameOrEmail: form.values.emailOrUsername,
                                    password: form.values.password
                                }
                            )}>Login</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </Paper>


        </>
    );
}