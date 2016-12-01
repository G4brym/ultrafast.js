var $ = require('jquery');

//Called after each page render
const postRender = (name) => {
    setTimeout(function(){
        $(document).trigger("postRender-" + name);
    }, 500);
}

export default postRender;