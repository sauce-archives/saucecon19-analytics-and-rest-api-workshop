// JS code for exercise 6 goes here
const username = process.env.SAUCE_USERNAME;
const accessKey = process.env.SAUCE_ACCESS_KEY;
const url = 'https://saucelabs.com/rest/v1/users/jtack4970';
const faker = require('faker');
const axios = require("axios");
const fs = require('fs');

const createAccounts = () => {
    //const element = window.document.getElementById('account-number');
    //const accountNum = parseInt(element).value;
    for (i = 0; i <= 10; i++) {
        const data = {};
        data.username = faker.fake("{{internet.userName}}");
        data.password = faker.fake("{{internet.password}}");
        data.name = faker.fake("{{name.findName}}");
        data.email = faker.fake("{{internet.email}}");
        JSON.stringify(data);
        axios({
            method: 'post',
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
            data: data
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};
createAccounts();