import express, { Request, Response, NextFunction } from "express";
import MeetingModel from "../4-models/meeting-model";
import meetingsLogic from "../5-logic/meetings-logic";
import { ConflictErrorModel } from "../4-models/error-models";

const router = express.Router();

router.get("/meetings/:teamId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const teamId = +request.params.teamId;
        const res = await meetingsLogic.getAllMeetingsByTeams(teamId);
        response.json(res);
    } catch (err: any) {
        next(err);
    }
});

router.post("/meetings", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meeting = new MeetingModel(request.body);
        const addMeeting = await meetingsLogic.addMeeting(meeting);
        return response.status(201).json(addMeeting);
    } catch (err: any) {
        if (err instanceof ConflictErrorModel) {
            return response.status(409).json({ message: err.message, suggestion: err.suggestion });
        }
        next(err);
    }
});

router.delete("/meetings/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await meetingsLogic.deleteMeeting(id);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

router.get("/meetings/suggest/:teamId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const teamId = +request.params.teamId;
        const suggestion = await meetingsLogic.suggestMeeting(teamId);
        response.json(suggestion);
    } catch (err: any) {
        next(err);
    }
});

export default router;
