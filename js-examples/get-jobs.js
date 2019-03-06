const username = process.env.SAUCE_USERNAME;
const accessKey = process.env.SAUCE_ACCESS_KEY;
const baseURL = 'https://' + username + ':' + accessKey + '@';
const jobAPI = 'saucelabs.com/rest/v1/' + username + '/jobs?limit=10';
const axios = require("axios");
const getJobs = async () => {
    try {
        response = await axios.get(baseURL + jobAPI);
        console.log(response.data.concurrency);
        return response;
    }
    catch (error)
    {
        console.log(error);
    }
};
getJobs();