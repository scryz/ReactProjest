import * as signalR from "@microsoft/signalr";

class SignalRService {
    constructor() {
        const token = localStorage.getItem("token");
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:7293/chatHub", {
                accessTokenFactory: () => `${token}`
            })
            .build();

        this.connection.on("ReceiveMessage", (message) => {
            console.log(`Received message: ${message}`); // Обработка полученного сообщения
            console.log(`HHHHHHHHHHHHHHHH`);
        });

        this.connection.onclose(error => {
            console.error('Connection closed with error: ', error);
            this.startConnection();
        });

        this.startConnection();
    }

    async startConnection(retryCount = 0) {
        if (this.connection.state !== 'Disconnected') {
            return;
        }
    
        try {
            await this.connection.start();
            console.log('Connection started');
            
            if (this.connection.state === 'Connected') {
                console.log("Подключение к серверу SignalR установлено.");
            } else {
                console.log("Подключение к серверу SignalR не установлено.");
            }
        } catch (error) {
            console.error('Error starting connection: ', error);
            if (retryCount < 5) { // Maximum number of retries
                setTimeout(this.startConnection.bind(this, retryCount + 1), 5000);
            } else {
                console.error('Maximum number of retries reached');
            }
        } finally {
            console.log('Connection start attempt finished');
        }
    }

    async join(roomName) {
        try {
            await this.connection.invoke("Join", roomName);
            console.log(`Joined room: ${roomName}`);
        } catch (error) {
            console.error(`Error joining room ${roomName}: `, error);
        }
    }

    sendMessage(message) {
        this.connection.invoke("SendMessage", message)
            .catch(error => {
                console.error('Error sending message: ', error);
                // Provide feedback to the user about what went wrong
            });
    }
}

export default new SignalRService();
