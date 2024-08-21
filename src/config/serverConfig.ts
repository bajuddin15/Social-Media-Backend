import dotenv from "dotenv";
dotenv.config({
  path: ".env.development",
});

const PORT = process.env.PORT ?? 5000;
const config = {
  PORT,
  SERVER_URL: `http://localhost:${PORT}`,
};

export { config };
