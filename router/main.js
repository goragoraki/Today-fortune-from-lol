const express = require('express');
const app = express();
const request = require("request");
var homeView = require('../views/home.js')
var searchView = require('../views/search.js')
var func = require('../function/api.js')
var calcul = require('../function/calculate.js')
const qs = require('querystring')
const api_key = 'RGAPI-a18c6dd4-6df4-4664-8ece-b377af46956b'
const urlenconde = require('urlencode')

app.get('/', (req, res) => {
    var html = homeView.html();
    res.send(html);
})

app.post('/process_search', (req, res) => {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        var post = qs.parse(body);
        var name = post.name;
        res.redirect(`/search/${name}`);
    });
})

app.get('/search/:Nick_name/', (req, res) => {
    var name = req.params.Nick_name;
    var nameUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + urlenconde(name) + "?api_key=" + api_key

    var my_info = { "kills": 0, "deaths": 0, "assists":0, "gold": 0};
    var team_info = [{ "kills": 0, "deaths": 0, "assists": 0, "gold": 0 }, { "kills": 0, "deaths": 0, "assists": 0, "gold": 0 }];
    request(nameUrl, function(error, response, body){
        var info_summoner_json = JSON.parse(body);
        var summoner_puuid = info_summoner_json["puuid"] 
        var summoner_name = info_summoner_json["name"] // 소환사 이름 추출
        console.log(summoner_name)

        var matchlistUrl = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + urlenconde(summoner_puuid)  +"/ids?start=0&count=20&api_key=" + api_key // 소환사 puuid 추출

        request(matchlistUrl, (error, response, body) => {
            var match_list = JSON.parse(body);

            //i 만큼의 매치 분석
            for (var i = 0; i < 1; i++) {
                var matchUrl = "https://asia.api.riotgames.com/lol/match/v5/matches/" + urlenconde(match_list[i]) + "?api_key=" + api_key
                //매치id추출
                request(matchUrl, (error, response, body) => {
                    var match = JSON.parse(body); //match id
                    var first_team_id = match["info"]["participants"][0]["teamId"]
                    var win;
                    
                    var my_team_id;
                    var other_team_id;
                    for (var j = 0; j < 10; j++) {
                        var p_id = match["metadata"]["participants"][j]
                        var team_id = match["info"]["participants"][j]["teamId"]
                        if (p_id == summoner_puuid) {
                            my_info["kills"] += match["info"]["participants"][j]["kills"]
                            my_info["deaths"] += match["info"]["participants"][j]["deaths"]
                            my_info["assists"] += match["info"]["participants"][j]["assists"]
                            my_info["gold"] += match["info"]["participants"][j]["goldEarned"]

                            my_team_id = match["info"]["participants"][j]["teamId"]
                            win = match["info"]["participants"][j]["win"];
                        }//자신의 정보
                        else {
                            if (first_team_id === team_id) {
                                team_info[0]["kills"] += match["info"]["participants"][j]["kills"]
                                team_info[0]["deaths"] += match["info"]["participants"][j]["deaths"]
                                team_info[0]["assists"] += match["info"]["participants"][j]["assists"]
                                team_info[0]["gold"] += match["info"]["participants"][j]["goldEarned"]   
                            }//자신의 팀 정보
                            else {
                                team_info[1]["kills"] += match["info"]["participants"][j]["kills"]
                                team_info[1]["deaths"] += match["info"]["participants"][j]["deaths"]
                                team_info[1]["assists"] += match["info"]["participants"][j]["assists"]
                                team_info[1]["gold"] += match["info"]["participants"][j]["goldEarned"]
                            }//상대팀 정보
                        }
                    }
                    if (first_team_id == my_team_id) {
                        my_team_id = 0;
                        other_team_id = 1;
                    }
                    else {
                        my_team_id = 1;
                        other_team_id = 0;
                    }
                    console.log("my info: " + Object.values(my_info));
                    console.log("team kills : " + Object.values(team_info[my_team_id]));
                    console.log(team_info[0]["gold"]);
                    console.log(win);

                    var data1 = calcul.achievement_fortune(my_info, team_info, my_team_id, other_team_id, win);
                    var data2 = calcul.gold_fortune(my_info, team_info, my_team_id, other_team_id, win);
                    console.log("ok")
                    var html = searchView.html(data1[0], data1[1], data1[2], data1[3], data2[0], data2[1]);
                    res.send(html)
                })
            }
        })
    })
});




























app.listen(3000, () => {
    console.log('listening on port 3000');
})