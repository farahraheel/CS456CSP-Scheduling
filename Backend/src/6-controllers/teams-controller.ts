import express, { Request, Response, NextFunction } from "express";
import teamsLogic from "../5-logic/teams-logic";

const router = express.Router(); 

// GET http://localhost:3001/api/teams
router.get("/teams", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const geoZone = await teamsLogic.getAllTeams();
        response.json(geoZone);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;