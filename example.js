var spiget = require("./spiget.js");


spiget.getResources(100,function(result) {
    for(var i = 0; i < result.length; i++) {
        spiget.getResource(result[i].id, function(resource) {
            console.log(resource);
        });
    }
})
