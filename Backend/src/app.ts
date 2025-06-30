import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import teamsController from "./6-controllers/teams-controller";
import meetingsController from "./6-controllers/meetings-controller";


const server = express();

server.use(cors());
server.use(express.json())
server.use("/api", teamsController);
server.use("/api", meetingsController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

