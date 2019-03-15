const apiUser = process.env.SAUCE_USERNAME;
const accessKey = process.env.SAUCE_ACCESS_KEY;
var username = "jtizzle";
const url = 'https://' + apiUser + ':' + accessKey + '@saucelabs.com/rest/v1/users/' + username + '/accesskey/change';
const axios = require('axios');
const rotateAPIKey = () => {
    axios.post(url,{})
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
};
rotateAPIKey();