var request = require("request");
var apikey = null;

var cricketMatches = function(callback) {
    request.post({
        url: "http://cricapi.com/api/cricket/",
        form: { apikey: apikey }
    }, function(err, resp, body) {
        callback(err,body);
    });
};


exports.getCricketScores = function(team1,team2,callback) {
    var pattern1 = new RegExp(team1,"i");
    var pattern2 = new RegExp(team2,"i");//case insensitive
    var match;
    console.log('Team 2 is ' + team2);
    cricketMatches(function(err,data){
        var matches = JSON.parse(data).data;
        console.log('matches ' + matches);
        for (var i=0; i<matches.length;i++ ){
            match = matches[i];
            if (match.description.search(pattern1)!=-1 || match.description.search(pattern2)!=-1){
                console.log('match desc is ' + match.description);
                callback(match.description);
            }
        }
        callback(-1);
    });
}



