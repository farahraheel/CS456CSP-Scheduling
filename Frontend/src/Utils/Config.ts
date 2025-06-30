class Config {
    public meetingsUrl = "http://localhost:30000/api/meetings";
    public teamsUrl = "http://localhost:30000/api/teams";

}

const appConfig = new Config(); // Singleton

export default appConfig;
