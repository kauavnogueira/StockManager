import path from "node:path";
import express from "express";
import routeProduto from "./routers/routeProduto";

const app = express();

app.use(express.json());
app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/produtos", routeProduto);

const frontendDist = path.resolve(__dirname, "../../FrontEnd/dist");
app.use(express.static(frontendDist));
app.get(/^(?!\/api).*/, (_request, response) => {
  response.sendFile(path.join(frontendDist, "index.html"));
});

export default app;
