const username = process.env.SAUCE_USERNAME;
const accessKey = process.env.SAUCE_ACCESS_KEY;
const baseURL = 'https://' + username + ':' + accessKey;
const jobAPI = '@saucelabs.com/rest/v1/' + username + '/jobs?limit=10';
const axios = require('axios');

const getJobs = async () => {
    try {
        response = await axios.get(baseURL + jobAPI)
        return response
    } catch (error) {
        console.error(error)
    }
}

const updateJobVisibility = async() => {
    const json_array = await getJobs()
    for (var i = 0; i < json_array.data.length; i++) {

        /* Grab the Job IDs based on the position in the Array */
        var jobID = json_array.data[i].id;
        //console.log(JSON.stringify(jobID))

        /* construct the url */
        const url = 'https://saucelabs.com/rest/v1/' + username +  '/jobs/' + jobID;
        console.log(url)

        /* construct the request using axios */
        axios({
            method: 'put',
            url: url,
            auth: {
                username: username,
                password: accessKey
            },
            config: {
                headers: {
                    'Content-Type': 'application-json'
                }
            },
            data: {
                'public': true
            },
        }).then(function (response) {
                console.log(response);
        }).catch(function (error) {
                console.log(error);
        });
    }
}

updateJobVisibility()
