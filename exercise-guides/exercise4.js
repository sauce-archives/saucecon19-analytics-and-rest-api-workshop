const username = 'cb-onboarding'
const SauceLabs = require("saucelabs").default;

const getSubAccounts = async () => {
    const api = new SauceLabs()
    try {
        response = await api.getSubAccounts();
        console.log(response);
        return response;
    }
    catch (error)
    {
        console.log(error);
    }
};
getSubAccounts()
