class AppConfig {

    // Database: 
    public host = "localhost"; // Computer name/address of our database
    public user = "root"; // Database user
    public password = "2822002"; // Database password
    public database = "meetingschedule"; // Database name

    // Server port: 
    public port = 30000;

}

const appConfig = new AppConfig();

export default appConfig;