var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;

var baseURL = 'https://' + username + ':' + accessKey + '@';
var userAPI =  'saucelabs.com/rest/v1/users/' + username;

const axios = require("axios");
const testAPI = async () => {
    try {
        response = await axios.get(baseURL + userAPI);
        console.log(response.data);
    }
    catch (error)
    {
        console.log(error);
    }
};
testAPI();