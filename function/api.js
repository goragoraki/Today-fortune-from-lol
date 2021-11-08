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

    var matchidUrl = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + urlenconde(summoner_puuid)  +"/ids?start=0&count=20&api_key=" + api_key // 소환사 puuid 추출

    request(matchidUrl, (error, response, body) => {
        console.log(body)
        var match_json = JSON.parse(body);
        var match_id = match_json["matchid"]
        console.log(match_id);
    })
})


