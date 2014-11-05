var mongoose = require('mongoose'),
    nconf = require('nconf');

exports.connect = function () {
    var connectset = nconf.get('connectset');
    if (connectset) {
        mongoose.connect(nconf.get('connectset').join(","), function (err) {
            if (err) {
                console.log("could not connect to DB: " + err);
                // workaround for replica set unable to find primary. let forever/cluster cycle process.
                process.exit();
            }
        });
    } else {
        console.log("connectset not found - could not connect to DB");
    }
};