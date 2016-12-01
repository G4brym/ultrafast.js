var handlebars = require('handlebars');

handlebars.registerHelper('isTrue', function (var1, options) {
  if(var1) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});