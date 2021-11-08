const express = require('express');
const app = express();
const request = require("request");
const api_key = 'RGAPI-584e1bd0-ab54-455d-9d51-caa0eb33e22a'
const urlenconde = require('urlencode')

var name = '고라키'
var nameUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + urlenconde(name) + "?api_key=" + api_key
request(nameUrl, function(error, response, body){
    var info_summoner_json = JSON.parse(body);
    var summoner_puuid = info_summoner_json["puuid"] 
    var summoner_name = info_summoner_json["name"] // 소환사 이름 추출
    console.log(summoner_name)
    console.log(summoner_puuid)

    var matchlistUrl = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + urlenconde(summoner_puuid)  +"/ids?start=0&count=20&api_key=" + api_key // 소환사 puuid 추출

    request(matchlistUrl, (error, response, body) => {
        var match_list = JSON.parse(body);
        console.log(match_list);

        for (var i = 0; i < 1; i++) {
            var matchUrl = "https://asia.api.riotgames.com/lol/match/v5/matches/" + urlenconde(match_list[i]) + "?api_key=" + api_key
            request(matchUrl, (error, response, body) => {
                var match = JSON.parse(body);
                var first_team_id = match["info"]["participants"][0]["teamId"]
                var my_info = { "kills": 0, "deaths": 0, "assists":0};
                var team_info = [{ "kills": 0, "deaths": 0,"assists":0 }, { "kills": 0, "deaths": 0, "assists":0}];
                
                var my_team_id;
                for (var j = 0; j < 10; j++) {
                    var p_id = match["metadata"]["participants"][j]
                    var team_id = match["info"]["participants"][j]["teamId"]
                    if (p_id == summoner_puuid) {
                        my_info["kills"] += match["info"]["participants"][j]["kills"]
                        my_info["deaths"] += match["info"]["participants"][j]["deaths"]
                        my_info["assists"] += match["info"]["participants"][j]["assists"]

                        my_team_id = match["info"]["participants"][j]["teamId"]
                    }
                    else {
                        if (first_team_id === team_id) {
                            team_info[0]["kills"] += match["info"]["participants"][j]["kills"]
                            team_info[0]["deaths"] += match["info"]["participants"][j]["deaths"]
                            team_info[0]["kills"] += match["info"]["participants"][j]["assists"]

                        }
                        else {
                            team_info[1]["kills"] += match["info"]["participants"][j]["kills"]
                            team_info[1]["deaths"] += match["info"]["participants"][j]["deaths"]
                            team_info[1]["assists"] += match["info"]["participants"][j]["assists"]
                        }
                    }
                }
                if (first_team_id == my_team_id) my_team_id = 0;
                else my_team_id = 1;
                console.log("my info: " + Object.values(my_info));
                console.log("team kills : " + Object.values(team_info[my_team_id]));
            })
        }
    })
})


