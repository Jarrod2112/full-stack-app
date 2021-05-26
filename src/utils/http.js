/**
 * @param {string} url
 */
function get(url) {
    return fetch(url).then(res => res.json());
}

/**
 * @param {string} url
 */
function post(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON'
        }
    }).then(res => res.json());
}
const http = {
    get, post
}

export default http;
