import * as signalR from "@microsoft/signalr";

class SignalRService {
    constructor() {
        const token = localStorage.getItem("token");
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://95.163.241.39:5000/chatHub", {
                accessTokenFactory: () => `${token}`
    })
            .build();

        this.connection.on("ReceiveMessage", (message) => {
            console.log(`Received message: ${message}`);
            // Обработка полученного сообщения
        });

        this.startConnection();
    }

    async startConnection() {
        try {
            await this.connection.start();
            console.log("SignalR connected");
        } catch (err) {
            console.error("Error connecting to SignalR:", err);
            setTimeout(this.startConnection.bind(this), 5000); // Исправлено привязка this к методу
        }
    }

    // Метод для отправки сообщения на сервер
    sendMessage(message) {
        this.connection.invoke("SendMessage", message);
    }
}

export default new SignalRService();