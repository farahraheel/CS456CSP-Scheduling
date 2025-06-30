class TeamModel {
    public id : number;
    public name : string;

    constructor (team: TeamModel) {
        this.id = team.id;
        this.name = team.name;
    }
}

export default TeamModel;
