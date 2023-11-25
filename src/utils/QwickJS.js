
/*!
 * Qwick v1.0.0
 * (c) 2023-2023 Ese Curtis
 * Released under the MIT License.
 */

import { io } from "socket.io-client";

const this_qwickEndpoint = "https://qwick.onrender.com";;

class Qwick {
    reconnectAttempts = 0;

    /**
     * Initializes the Qwick class with the provided channel ID and configuration.
     *
     * @param {String} channelID - Unique identifier for the communication channel.
     * @param {Object} config - Configuration options for the Qwick class.
     */
    constructor(channelID = String, config = Object, disconnectWatcher = false) {
        this.config = config;
        this.configInfo = config?.info ? config.info : {};

        if(!io) {
            this.#showLog("Socket.io Client Library not detected. And Qwick Initilization failed as it is a primary dpendency", console.error);
            return false;
        }

        this.socket = io(this_qwickEndpoint);
        this.channelID = null;
        this.#showLog('Qwick class initialized');
        this.#configure(channelID);
        this.#handleDisconnect();


        if(!disconnectWatcher) {
            this.disconnectChannel = new Qwick(`${channelID}:disconnected`, config, true);
        }
    }

    static async channelExist(channelID) {
        const response = await fetch(this_qwickEndpoint + "/ping/check-existence", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channelID
            }),
        });

        const result = await response.json();
        return result.existence;
    }

    #showLog(log, logger = console.log) {
        if (this.config?.allowLogging) {
            const timestamp = new Date().toISOString();
            let methodName = 'Method';

            try {
                methodName = new Error().stack.split('\n')[2].match(/at\s+(.*)\s+/)[1];
            } catch (error) {
                methodName = 'UnknownMethod';
            }
            logger(`${timestamp} - ${methodName}: ${log}`);
        }
    }

    #configure(channelID) {
        this.#showLog('Configuring with channel ID: ' + channelID);
        this.channelIDPromise = new Promise((resolve, reject) => {
            this.socket.on("config", (configData) => {
                if (channelID) {
                    this.channelID = configData.channelID;
                    this.key = configData.key;

                    resolve(channelID);
                } else {
                    reject("Invalid channelID received from the server.");
                }
            });

            this.socket.emit("config", channelID && { channelID: channelID, info: this.configInfo });
        });
    }

    #handleDisconnect() {
        this.socket.on("disconnect", () => {
            this.#showLog('Socket disconnected. Attempting to reconnect...', console.warn);
            this.#reconnect();
        });
    }

    listen(callback = Function) {
        this.#showLog('Listening for messages');
        this.socket.on("message", callback);
    }

    listenDisconnect(callback = Function) {
        this.#showLog('Listening for disconnections');
        this.disconnectChannel.listen(callback);
    }

    async broadcast(payload = Object, scope = "self") {
        this.#showLog('Sending message with payload: ' + JSON.stringify(payload));
        let pingType = scope;

        try {
            await this.channelIDPromise;
            const success = await this.#ping(payload, pingType);
            this.#showLog('Message sent successfully');
            return success;
        } catch (error) {
            this.#showLog('Error in message: ' + error, console.error);
            return false;
        }
    }

    async #ping(payload, pingType) {
        this.#showLog('Pinging server with payload: ' + JSON.stringify(payload));
        const pingTo = this.#determinePingTo(pingType);
        const pingRoute = this.#determinePingRoute(pingType);

        try {
            const response = await this.#sendPingRequest(pingRoute, payload, pingTo);

            if (!response.ok) {
                if (response.status === 401) {
                    if (this.reconnectAttempts < 3) {
                        this.reconnectAttempts++;
                        await this.#handleUnauthorizedError(payload, pingType);
                        return await this.#ping(payload, pingType);
                    } else {
                        throw new Error(`Request failed with status ${response.status}. Reconnection attempts exhausted.`);
                    }
                } else {
                    throw new Error(`Request failed with status ${response.status}`);
                }
            }

            const result = await this.#handleSuccessfulPingResponse(response);

            this.reconnectAttempts = 0;
            return result.success;
        } catch (error) {
            this.#handlePingError(error);
            return false;
        }
    }

    #determinePingTo(pingType) {
        let pingTo = this.key;
        if (pingType !== 'self' && pingType !== 'public') {
            pingTo = pingType;
        }
        return pingTo;
    }

    #determinePingRoute(pingType) {
        let pingRoute = "/self";
        if (pingType === 'public') {
            pingRoute = "/public";
        }
        return pingRoute;
    }

    #sendPingRequest(pingRoute, payload, pingTo) {
        return fetch(this_qwickEndpoint + "/ping" + pingRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channelID: this.channelID,
                key: pingTo,
                payload,
            }),
        });
    }

    async #handleUnauthorizedError(payload, pingType) {
        await this.#reconnect(payload, pingType);
    }

    async #handleSuccessfulPingResponse(response) {
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                this.#showLog(result.message, console.log);
            } else {
                this.#showLog(result.message, console.warn);
            }
            return result;
        }
    }

    #handlePingError(error) {
        this.#showLog('Error in ping: ' + error.message, console.error);
    }

    async #reconnect(payload, pingType) {
        this.reconnectAttempts++;

        if (this.reconnectAttempts <= 3) {
            this.#showLog(`Reconnecting. Attempt ${this.reconnectAttempts}...`);
            await new Promise((resolve) => {
                this.#configure(this.channelID);
                this.channelIDPromise.then(() => {
                    this.#showLog('Reconnection successful.', console.info);
                    this.broadcast(payload, pingType);
                    resolve();
                });
            });
        } else {
            this.#showLog('Reconnection attempts exhausted.', console.error);
        }

        this.reconnectAttempts = 0;
    }
}

export default Qwick