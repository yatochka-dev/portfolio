import pb from "../pocketbase";
import {useContext} from "react";
import type {ReturnType} from "./SessionProvider";
import SessionContext from "./SessionProvider";

interface AuthCredentials {
    usernameOrEmail: string;
    password: string;
}



export default function useSession(): ReturnType {
    return useContext(SessionContext);
}


export async function signIn(
    credentials: AuthCredentials
) {
    const auth = await pb.collection("users").authWithPassword(
        credentials.usernameOrEmail,
        credentials.password,
        {},
        {}
    )

    console.log("Logged in", auth)

}

export function signOut() {
    pb.authStore.clear();
}