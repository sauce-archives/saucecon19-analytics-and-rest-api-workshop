
const jobID = 'f54e7fc1580748bcbd56d0aa8b918f9d'

const SauceLabs = require('saucelabs').default;
const api = new SauceLabs()
const getJob = async () => {
     try {
         response = await api.getJob(process.env.SAUCE_USERNAME, jobID);
         console.log(response);
     }
     catch (error)
     {
         console.log(error);
     }
 };
 // getJob();


const getJobs = async () => {
    try {
        response = await api.listJobs(process.env.SAUCE_USERNAME, { limit: 4 });
        console.log(response);
    }
    catch (error)
    {
        console.log(error);
    }
};
getJobs();
