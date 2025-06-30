
export enum Rooms {
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
}

class MeetingModel {
    public id: number;
    public teamId: number;
    public startTime: string;
    public endTime: string;
    public description: string;
    public room: Rooms;

    constructor(meeting?: Partial<MeetingModel>) {
        this.id = meeting?.id || 0;
        this.teamId = meeting?.teamId || 0;
        this.startTime = meeting?.startTime || "";
        this.endTime = meeting?.endTime || "";
        this.description = meeting?.description || "";
        this.room = meeting?.room || Rooms.RED;
    }
}

export default MeetingModel;
