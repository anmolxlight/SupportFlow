# SupportFlow

**SupportFlow** is a conversational AI customer support system integrated with Twilio and Eleven Labs APIs, using Kafka and MongoDB for event streaming and backend storage. This repo contains the **frontend** of the project.

---

## 🔗 Project Structure

Our project is split across three repositories:

1. **Frontend (this repo)** – [`SupportFlow`](https://github.com/gulshandubbani2003/SupportFlow)
2. **Backend (Call History Service)** – [`Supportflow-backend`](https://github.com/anmolxlight/Supportflow-javabackend)
3. **Kafka Module** – [`Supportflow-kafkamodule`](https://github.com/gulshandubbani2003/Supportflow-Kakfamodule)

---

## 🚀 Setup Instructions

Follow these steps in **this exact order** to get the project up and running locally:

---

### 🧠 Step 1: Start Kafka and Zookeeper

```bash
cd C:\kafka\bin\windows
java -cp "C:\kafka\libs\*" org.apache.zookeeper.server.quorum.QuorumPeerMain C:\kafka\config\zookeeper.properties
```

```bash
cd C:\kafka\bin\windows
kafka-server-start.bat ..\..\config\server.properties
```

---

### 🌐 Step 2: Start Ngrok

```bash
cd C:\Users\91727\Downloads\ngrok-v3-stable-windows-amd64
ngrok.exe http 8080
```

Keep the terminal open and copy the forwarded `https` URL.

---

### 📡 Step 3: Run Kafka Consumer Module

Clone and open the [`Supportflow-kafkamodule`](https://github.com/yourusername/Supportflow-kafkamodule) repo in Eclipse IDE.

Run the **KafkaConsumer.java** file as a Java application.

---

### 📞 Step 4: Run Twilio Call Handler (Spring Boot)

Open the [`Supportflow-kafkamodule`](https://github.com/gulshandubbani2003/Supportflow-Kakfamodule) repo in Eclipse.

Run the **TwilioCallHandler.java** Spring Boot application.

---

### 🔗 Step 5: Configure Webhook in Eleven Labs

1. Go to the Eleven Labs Conversational AI dashboard
2. Navigate to **Post-call Webhook Settings**
3. Paste the ngrok URL copied earlier and add `/webhook` at the end

   Example:
   ```
   https://<your-ngrok-subdomain>.ngrok.io/webhook
   ```

4. After saving, copy the **Webhook Secret** generated.

5. Open the `application.properties` file in the Kafka module and **update the webhook secret**:
   ```
   webhook.secret=your_generated_webhook_secret
   ```

---

### 🧾 Step 6: Start Call History Backend

Clone the [`Supportflow-backend`](https://github.com/anmolxlight/Supportflow-javabackend) repo.

Run the following command to start the Spring Boot application:

```bash
./mvnw spring-boot:run
```

This will start the backend service connected to MongoDB for storing and retrieving call history.

---

### 💻 Step 7: Start Frontend (This Repo)

Clone this repo [`SupportFlow`](https://github.com/gulshandubbani2003/SupportFlow).

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Your frontend is now live at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing the Live Project

1. **Buy a Twilio Testing Number**
2. Link it with Eleven Labs
3. Add sample knowledgebase & agent setup
4. Make a test call to interact with the AI agent

The full pipeline from call → AI agent → webhook → Kafka → MongoDB → frontend is now active.

---

## 🛠 Tech Stack

- **Frontend**: Typescript
- **Backend**: Spring Boot + MongoDB
- **Streaming**: Apache Kafka
- **Dev Tools**: Eclipse, VS Code, Ngrok
- **Voice API**: Twilio
- **AI Voice**: Eleven Labs

---

## 📂 Repository Links

- [SupportFlow (Frontend)](https://github.com/gulshandubbani2003/SupportFlow)
- [Supportflow-backend (Call History Service)](https://github.com/anmolxlight/Supportflow-javabackend)
- [Supportflow-kafkamodule (Kafka Streaming)](https://github.com/gulshandubbani2003/Supportflow-Kakfamodule)

---

## 📞 Contact

For any questions or setup issues, reach out to [anmolx.work@gmail.com].
