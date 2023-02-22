import React, {useEffect, useState} from 'react';
import pb from "../pocketbase";
import type {BaseAuthStore} from "pocketbase";
import type {User} from "../models";



export type Status = 'loading' | 'authenticated' | 'unauthenticated';

type AuthStore = BaseAuthStore & {
    model: User | null
};

export interface ReturnType {

    status: 'loading' | 'authenticated' | 'unauthenticated';
    session: AuthStore | null | undefined;
}

const SessionContext = React.createContext({
    session: null,
    status: "loading",
} as ReturnType);

export default SessionContext;

export function SessionProvider({children}: {children: React.ReactNode }) {
    const [status, setStatus] = useState<Status>("loading");
    const [session, setSession] = useState<BaseAuthStore | null>();


    useEffect(() => {


        const removeListener = pb.authStore.onChange(
            (token, model) => {
                if (model === null) {
                    setStatus('unauthenticated');
                    setSession(null);
                } else {
                    setStatus('authenticated');
                    setSession(pb.authStore);
                }
            },
            true
        )

        return () => {
            removeListener();
        }
    }, []);

    return (
        <SessionContext.Provider value={{
            status,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            session,
        }}>
            {children}
        </SessionContext.Provider>
    );
}

