import {type NextPage} from "next";
import {Box, Button} from "@mui/material";
import {useToggle} from "@mantine/hooks";
import useSession, {signOut} from "../lib/auth/useSession";
import LoginForm from "../components/layout/LoginForm";
import TextBox from "../components/TextBox";


function RegisterForm() {
    return <>Register Form</>;
}

const Auth: NextPage = () => {
    const {status} = useSession();
    const [currentForm, toggle] = useToggle(
        ["login", "register"]
    );

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            {
                status === "authenticated" ? (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}>
                        <TextBox variant={"h4"}>
                            You are already logged in.
                        </TextBox>
                        <Button variant={"outlined"} onClick={signOut} >Logout</Button>
                    </Box>
                ) : (
                    <>

                        <Button onClick={() => toggle()}>Change form</Button>
                        {
                            currentForm === "login" ? <LoginForm/> : <RegisterForm/>
                        }
                    </>
                )
            }
        </Box>
    );
};

export default Auth;
