var alertify = require('alertify.js');
alertify.logPosition("bottom right");

const alerts = {
    success: (text) => { alertify.delay(2000).success(text); },
    error: (text) => { alertify.error(text); }
}

export default alerts;