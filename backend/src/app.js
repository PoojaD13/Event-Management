import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";

import rateLimiter from "./middlewares/rateLimiter.middleware.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import path from "path";

const app = express();



app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // app.use(cors());
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// 1. Array containing all valid development origin addresses
const allowedOrigins = [
  "http://localhost:5173",
  "http://10.162.31.215:5173",
  "http://172.25.128.1:5173"// 👈 Add your exact network IP here
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server or postman calls (origin is undefined) and explicitly whitelisted domains
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS security boundaries"));
    }
  },
  credentials: true, // Required for your session cookie variables to pass across ports
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(compression());

app.use(rateLimiter);

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;
