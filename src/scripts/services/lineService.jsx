const axios = require('axios');

const getLineById = function (id) {
    "use strict";
    axios.get('localhost:4000/api/line/', {
        params: {
            _id: id
        }
    })
        .then(function (response) {
            console.log(response);
        });
};

const getAllLines = function () {
    "use strict";
    return axios.get('http://localhost:4000/api/line/');
};

export default {
    getLineById,
    getAllLines
}