const apiURL = "http://localhost:3000";

export const config ={
    API_URL : process.env.apiURL || apiURL,
    NODE_ENV : process.env.NODE_ENV || "development"
}