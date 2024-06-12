
const env = {
    APP_PORT : 4000,
    //MONGO_HOST: "database", // In docker you need to use the service name, when is a not docker project use "localhost" or your real host
    MONGO_HOST: "localhost",
    MONGO_PORT: "27017",
    MONGO_DATABASE: "db_example",
    MONGO_USERNAME: "admin",
    MONGO_PASSWORD: "admin",
    getMongoUriString() {
        // const mongoUri = `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE}?authSource=admin`;
        return `mongodb://${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE}`;
    }
};

export default env;