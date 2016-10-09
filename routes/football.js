var Feed = require('rss-to-json');


function getResponseObject(team1, team2, score, keyMoment) {
    var json;
    json.team1 = team1;
    json.team2 = team1;
    json.score = team1;
    json.keyMoment = team1;
    return json;
}
exports.getSoccerScores = function (team1, team2, callback) {
    var pattern1 = new RegExp(team1,"i");
    var pattern2 = new RegExp(team2,"i");//case insensitive
    var match;
    var title = '#Basketball #Livescore @ScoresPro: (PHI-) #Ginebra Kings vs #Petron B. Boosters: 67-96';
    Feed.load('http://www.scorespro.com/rss2/live-tennis.xml', function(err, result){
        console.log(result);
        var matches = JSON.parse(result).items;

        for (var i =0; i <matches.length ; i++){
            match = matches[i];
           if(matches[i].title.search(pattern1)!=-1 && matches[i].title.search(pattern2)!=-1){
               var title = matches[i].title;
               var indexOfBracket = title.indexOf("-)");
               title = title.substr(indexOfBracket);

               var indexOfVs = title.indexOf("vs");
               var indexOfColon = title.indexOf(":");

               var team1 = title.substr(0,indexOfVs-1);
               var team2 = title.substr(indexOfVs+2,indexOfColon - 1);
               var score = title.substr(indexOfColon + 1);
               var keyMoment = matches[i].description;
               var response = getResponseObject(team1,team2,score,keyMoment);
               callback(err,response);

           }

        }

        callback(err,"noMatch");
    });

};

