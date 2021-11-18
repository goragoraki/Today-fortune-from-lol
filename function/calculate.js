module.exports = {
    
    gold_fortune: function (my_info, team_info, my_team_id, other_team_id, win) {
        var gold_figure = 0;
        var money_luck = "";
        var my_gold = my_info["gold"]
        var team_gold = my_info["gold"] + team_info[my_team_id]["gold"];
        var oposs_team_gold = team_info[other_team_id]["gold"];
        
        // 자신의 골드가 팀 골드보다 많을 때
        if (5 * my_gold > team_gold) {
            if (team_gold > oposs_team_gold) {
                if (win) {
                    gold_figure += 1
                    money_luck = `큰 계약이나 매수, 매도를 할 수 있는 날입니다. 과감하게 도전하려는 의지가 필요합니다. 사소한 것에 얽매여 자신감을 드러내지 못하고 적극적으로 나서지 못하면은 오히려 일을 망치게 되는 결과를 얻을 수 있습니다. 아침부터 기회를 엿보다가 적당한 상황이 도래했다 싶을 때 과감한 결정을 내리십시오. 상황을 신중하게 살피고 올바른 결정을 내리는 것은 당신의 몫으로 오늘 당신의 능력이 더욱 빛을 발할 수 있습니다. 로또를 구매할 때에도 느낌이 오는 숫자를 체크하면 그만인 것입니다.`
                } else {
                    gold_figure -= 2
                    money_luck = `무엇에 썼는지 기억도 안 나는데 지난 소비 수준이 나를 울리는 하루입니다. 잔액을 확인해보면 역시 긴축 재정이 필요한 순간입니다. 조금씩 지출하는 것이 수입에 비해 현저하게 높아질 수 있으며 이는 자신에게 스트레스로 다가올 수 있습니다. 조금은 아껴쓰는 자세가 필요합니다. 무슨 일에서든 상황을 제대로 판단하고 돈을 쓰는 습관을 기르는 것이 중요합니다. 충동 구매는 자제하는 것이 좋을 듯 하군요. 오늘 같은 날은 로또 복권 구입은 자제하는 것이 바람직할 것입니다.`
                }
            } else {
                if (win) {
                    gold_figure += 0.5
                    money_luck = `들어오는 재물이 있는가 하면 나가는 재물이 있으니 불안할 수도 있겠지만 결국 정리해 보면 평균 이상의 수익을 얻는 날이 될 것입니다. 생각보다 많은 지출로 인해 스트레스를 받는 일도 있겠지만 당신의 수입을 생각해보세요. 의외로 평소에 비해 더 많은 금전적인 부분이 생길 수 있답니다. 또한 마음을 급하게 먹지 않고 천천히 상황을 아우르는 것도 당신의 뛰어난 능력이 될 수 있다는 것을 기억하도록 하세요.`
                }
                else {
                    gold_figure -= 1
                    `주식이나 투자를 할 때 모험성이 강한 일은 피해야 하는 하루입니다. 당장 금전적인 이익이 클 것 같아도 오히려 손해를 보기 쉽습니다. 왠만하면 현재의 상황을 그대로 지켜보는 편이 좋습니다. 섣불리 투자를 했다가 좋지 않은 결과를 가져 오게 되면 오히려 자신의 기분까지 망칠 수 있는 경우가 생길 수 있습니다. 또한 무리한 성격의 투자보다는 안정적인 투자나 장기적인 투자가 길하게 작용합니다. 우선 상황을 정확하게 판단하고 수입과 지출에 대한 계획을 세우십시오. 또한 오늘 같은 날은 로또 구입은 자제해야 할 것입니다.`
                }  
            }
        }//자신의 골드가 팀 골드보다 적을 때
        else {
            if (team_gold > oposs_team_gold) {
                if (win) {
                    gold_figure += 2
                    money_luck = `재물을 얻기 좋은 날입니다. 손해보다는 이익을 보기 좋은 날로 행운이 당신과 함께 합니다. 주식 투자 등을 하기 좋을 날이고 선배의 조언이 큰 힘이 됩니다. 자신이 투자를 하거나 주식을 샀다면 그로 인해 손해를 보는 일보다는 이익을 얻는 것이 쉽습니다. 재물에 대한 운이 당신을 향해 있으므로 생각하고 있는 계획이 있다면 직접 행동으로 옮기는 것 또한 나쁘지 않을 것입니다. 자신 혼자만의 결정보다는 주변과 상의하는 것도 나쁘지 않습니다. 또한 로또 복권을 산다면, 윗사람의 조언을 들어보는 것이 도움이 될 것입니다.`
                }
                else {
                    gold_figure -= 1
                    money_luck = `금전 운이 하향세를 띠니 주의를 기울여야 손실을 줄일 수 있습니다. 특히 투자나 매매 는 후일을 기약해야 하는 날입니다. 원하는 투자가 있다고 하더라도 잠시의 욕심을 피해 장기적인 승부를 띄워야 하는 때입니다. 기존 수입 범위 내에서 알뜰한 소비를 하는 것이 후회를 줄이는 길이 됩니다. 자신이 원하지 않는 곳에서 지출이 따를 수 있기 때문에 여려 가지 상황을 모두 고려해야 합니다. 따라서, 로또 구입도 자제하시기 바랍니다. 조금만 주의를 기울여 욕심을 줄이는 행동을 하는 것이 금전적인 손실을 피할 수 있는 지름길이 될 수 있습니다`
                }
            } else {
                if (win) {
                    gold_figure += 3
                    money_luck = `남의 재물을 탐내고 그것을 갖기 위해 일을 꾸몄다가는 그 화가 당신에게 배로 돌아오게 됩니다. 남의 떡이 더 커 보인다고 했듯이 현재 당신이 가지고 있는 것보다 다른 사람의 재물이 더 커 보이는 하루입니다. 그러나 당신의 마음에서 욕심을 걷어낸다면 당신의 재물도 그리 나쁘지 않다는 것을 알 수 있습니다. 사람의 욕심만큼 나쁜 것은 없습니다. 조금은 마음을 차분히 가지고 자신의 상황을 무엇보다 정확하게 판단하는 자세가 필요합니다. 또한 로또 구매는 가급적 피하는게 유리합니다.`
                }
                else {
                    gold_figure -= 1
                    money_luck = `금전 운이 하향세를 띠니 주의를 기울여야 손실을 줄일 수 있습니다. 특히 투자나 매매 는 후일을 기약해야 하는 날입니다. 원하는 투자가 있다고 하더라도 잠시의 욕심을 피해 장기적인 승부를 띄워야 하는 때입니다. 기존 수입 범위 내에서 알뜰한 소비를 하는 것이 후회를 줄이는 길이 됩니다. 자신이 원하지 않는 곳에서 지출이 따를 수 있기 때문에 여려 가지 상황을 모두 고려해야 합니다. 따라서, 로또 구입도 자제하시기 바랍니다. 조금만 주의를 기울여 욕심을 줄이는 행동을 하는 것이 금전적인 손실을 피할 수 있는 지름길이 될 수 있습니다`
                }  
            }
        }
    }

}