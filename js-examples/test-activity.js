const username = process.env.SAUCE_USERNAME;
const accessKey = process.env.SAUCE_ACCESS_KEY;
const subAccountAPI = 'https://' + username + ':' + accessKey + '@saucelabs.com/rest/v1/users/' + username + '/subaccounts'
const axios = require("axios");

const getSubAccounts = async () => {
    try {
        response = await axios.get(subAccountAPI);
        //console.log(response.data);
        return response;
    }
    catch (error)
    {
        console.log(error);
    }
};

const getConcurrency = async () => {
    const json_array = await getSubAccounts()
    for (var i = 0; i < json_array.data.length; i++) {

        // Grab the subaccount based on the position in the Array
        const subAccount = json_array.data[i].id;
        //console.log(subAccount);

        // construct the url /
        const url = 'https://saucelabs.com/rest/v1.1/users/' + subAccount + '/concurrency';
        axios({
            method: 'get',
            url: url,
            auth: {
                username: username,
                password: accessKey
            },
            config: {
                headers: {
                    'Content-Type': 'application-json'
                }
            }
        }).then(function (response) {
            console.log(response.data.concurrency.self);
            return response.data.concurrency;
        }).catch(function (error) {
            console.log(error);
        });
    }
};
getConcurrency()