var helper = require(__dirname + '/helper.js');
exports.getLiveScores = function(sport, team1, team2, callback) {

    sport = sport.replace("_"," ").toLowerCase().trim();
    team1 = team1.replace("_"," ").toLowerCase().trim();
    team2 = team2.replace("_"," ").toLowerCase().trim();

    console.log("sport team1 team2" + sport + " "+ team1 + " " + team2);

    switch(sport){
        case "cricket":
            helper.getCricketScores(team1,team2,callback);
            break;
        default:
            helper.getOthersScores(sport,team1,team2,callback);
    }

}


exports.getAllMatches = function(sport,callback) {
    sport = sport.replace("_"," ").toLowerCase().trim();
    console.log("sport" + sport );
    if (sport == "cricket") {
        return helper.getAllCricketMatches(callback);
    }else{
        return helper.getAllOtherMatches(sport,callback);
    }
}