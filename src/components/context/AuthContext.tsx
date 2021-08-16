import React from "react";
import { createContext, useContext } from "react";
import { SelfDetails } from "../../lib/models/selfDetails";
import { WebsocketClient } from "../../lib/socket/client";

export interface UserAccount {
    uid: string;
    username: string;
    color: string;
}

export type AuthContextType = {
    isAuthenticated: boolean;
    user?: UserAccount;
    socket: WebsocketClient;
    clearUser: () => void;
    session?: string;
};

export const AuthContxt = createContext<AuthContextType>({
    isAuthenticated: false,
    clearUser: () => {},
    socket: new WebsocketClient("/api/socket"),
});

export const useAuth = () => useContext(AuthContxt);

export interface AuthenticationContextProps {}

export interface AuthenticationContextState {
    user?: UserAccount;
    hasChecked: boolean;
    socket: WebsocketClient;
}

class AuthenticationContextProvider extends React.Component<
    AuthenticationContextProps,
    AuthenticationContextState
> {
    async componentDidMount() {
        if (!this.isAuthed) {
            console.log("Not logged in");
        }
        this.setState({ hasChecked: true });
    }

    constructor(props: AuthenticationContextProps) {
        super(props);
        this.state = {
            hasChecked: false,
            socket: new WebsocketClient("/api/socket"),
        };
    }

    getCookie(key: string) {
        return (
            document.cookie
                .split("; ")
                .find((row) => row.startsWith(key))
                ?.split("=")[1] ?? undefined
        );
    }

    async getUserDetails(): Promise<SelfDetails | undefined> {
        const r = await fetch("/api/me");

        if (r.ok) {
            const user = (await r.json()) as SelfDetails;
            return user;
        } else {
            console.error(r);
            return undefined;
        }
    }

    public get isAuthed(): boolean {
        const isAuthed = this.state.user !== undefined;
        return isAuthed;
    }

    public clearUser = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });
        this.setState({ user: undefined });
    };

    public get session(): string | undefined {
        return this.getCookie("csSessionId");
    }

    render() {
        return (
            <AuthContxt.Provider
                value={{
                    ...this.state,
                    isAuthenticated: this.isAuthed,
                    clearUser: this.clearUser,
                    session: this.session,
                }}
            >
                {this.props.children}
            </AuthContxt.Provider>
        );
    }
}

export default AuthenticationContextProvider;
