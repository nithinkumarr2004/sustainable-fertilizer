## System Architecture Diagram

```mermaid
flowchart LR
    subgraph Client["React Frontend (Tailwind, Recharts)"]
        UI[Home / Dashboard / Prediction Tool]
        Auth[AuthContext & Axios Service]
    end

    subgraph Backend["Node.js + Express API"]
        AuthAPI[/Auth Routes/]
        SoilAPI[/Soil Routes/]
        FertAPI[/Fertilizer Routes/]
        Services[(Controllers & Services)]
        Mongo[(MongoDB Atlas/Local)]
    end

    subgraph AIMicroservice["Flask AI Service"]
        Predict[/POST /predict/]
        Model[(model.pkl)]
    end

    UI -->|Form data| AuthAPI
    UI -->|Authenticated requests| SoilAPI
    UI -->|Prediction request| FertAPI
    AuthAPI --> Mongo
    SoilAPI --> Mongo
    FertAPI --> Mongo
    FertAPI -->|Axios| Predict
    Predict --> Model
    Predict -->|Recommendation JSON| FertAPI
    FertAPI -->|Response| UI
```

### Workflow
- Farmers submit soil parameters through the React interface.
- Express backend validates input, persists soil data, and forwards sanitized payloads to the Flask AI API.
- The AI microservice loads `model.pkl`, performs Random Forest inference, augments the payload with deficiency analysis and suggestions, and returns insights as JSON.
- Backend stores the recommendation history in MongoDB and relays the response to the frontend dashboards and charts.








