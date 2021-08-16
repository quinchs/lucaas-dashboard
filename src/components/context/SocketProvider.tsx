import { useContext, useEffect, useState } from "react";
import { WebsocketClient } from "../../lib/socket/client";
import { AuthContxt } from "./AuthContext";

export interface SocketProviderProps {}

const SocketProvider: React.FC<SocketProviderProps> = (props) => {
    var context = useContext(AuthContxt);

    const handleUpdate = async () => {
        if (context.isAuthenticated && !context.socket.isConnected) {
            console.log("Starting websocket session");
            await context.socket.connect(
                context.session!,
                window.location.pathname,
                []
            );
        }
        if (!context.isAuthenticated && context.socket.isConnected) {
            console.log("Disconnecting websocket");
            await context.socket.close();
        }
    };

    useEffect(() => {
        handleUpdate();
    }, [context]);

    return <>{props.children}</>;
};

export default SocketProvider;
