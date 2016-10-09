var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helper = require(__dirname + '/helper.js');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



function getLiveScores(sport, team1, team2, callback) {

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


function getAllMatches(sport,callback) {
    sport = sport.replace("_"," ").toLowerCase().trim();
    console.log("sport" + sport );
    if (sport == "cricket") {
        return helper.getAllCricketMatches(callback);
    }else{
        return helper.getAllOtherMatches(sport,callback);
    }
}
app.get('/',function(req,res){
/*    getLiveScores("soccer","Macedonia","italy",function(err,score){
        if(err){
            res.send({code:"404","reason":err.message});
        }else{
            console.log("the score is " + JSON.stringify(score));
            res.send(score);
        }
    });*/
    getAllMatches("cricket",function(err,response){
        if(err){
            res.send({code:"404","reason":err.message});
        }else{
            console.log("the matches are " + JSON.stringify(response));
            res.send(response);
        }
    });
});





module.exports = app;
