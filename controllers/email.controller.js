const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const { CookieJar } = require('tough-cookie');
const { throttleAdapterEnhancer } = require('axios-extensions');
const jar = new CookieJar();


const getInbox = async function (req, res) {
    try {
        let instance = axios.create({ baseURL: 'https://emailfake.com', 	headers: { 'Cache-Control': 'no-cache' },
        adapter: throttleAdapterEnhancer(axios.defaults.adapter, 2 * 1000), withCredentials: true, jar });
        axiosCookieJarSupport(instance)
        let result = await instance.get('/' + req.params.email, { headers: { 'Cache-Control': 'no-cache' },
        adapter: throttleAdapterEnhancer(axios.defaults.adapter, 2 * 1000), withCredentials: true, jar });
        const dom = new JSDOM(result.data);
        let link = dom.window.document.getElementsByClassName("mb_blk")[0].getElementsByTagName("a")[0].href
        let parameter = {
            status: true,
            link: link,
            email:unescape(link.split("e=")[1].split("&")[0]),
            code: link.split("c=")[1].split("&")[0]
        }
         res.status(200).json(parameter);
        } catch (error) {
         res.status(200).json({ status: false });
    }
}
module.exports = getInbox;