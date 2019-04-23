const username = 'cb-onboarding'
const SauceLabs = require("saucelabs").default;

const testAPI = async () => {
    const api = new SauceLabs()
    try {
        response = await api.getUser(username);
        console.log(response);
    }
    catch (error)
    {
        console.log(error);
    }
};
testAPI()
