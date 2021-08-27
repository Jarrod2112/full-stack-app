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
/**
 * @param {string} url
 */
function del(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'DELETE',
        headers: {
            'Content-Type': 'Application/JSON'
        }
    }).then(res => res.json());

}

/**
 * Sends an HTTP PATCH request.
 * 
 * HTTP PATCH is used to modify part of an existing resource.
 */
function patch(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'PATCH',
        headers: {
            'Content-Type': 'Application/JSON'
        }
    }).then(res => res.json());
}
/**
 * Sends an HTTP PUT request.
 * 
 * HTTP PUT is used to replace an existing resource.
 */
function put(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/JSON'
        }
    }).then(res => res.json());
}

const http = {
    get, post, del, put, patch,
}

export default http;
