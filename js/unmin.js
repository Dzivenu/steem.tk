var loadBar = document.getElementById("loadbar").classList;
var loaderplace = document.getElementById("loaderplace").classList;
var dynamic = document.getElementById("dynamic").classList;

var account = 'vik';
var l = 2000;
var f = l;
var next = 0;
var mostpopular = [];
var chartItems = [];
var chartItemsComm = [];
var chartItemsFLAG = [];
var outVote = [];
var inVote = [];
var inComm = [];
var outComm = [];
var inReblog = [];
var outReblog = [];
var inFlag = [];
var outFlag = [];
var mostTags = [];

var count = 0;

if("VOTES" in localStorage){
				var ch = localStorage.getItem("VOTES")
				buildChart(JSON.parse(ch),'vote-container','Голосования. (Для обновления проанализируйте аккаунт снова)');
} else {
buildChart(FallbackUPVOTES,'vote-container','График входящих/исходящих голосов аккаунта @vik');

}


if("COMMENTS" in localStorage){
				var ch = localStorage.getItem("COMMENTS")
				buildChart(JSON.parse(ch),'comments-container','График взаимодействия комментариев. (Для обновления проанализируйте аккаунт снова)');
} else {
buildChart(FallbackCOMMENTS,'comments-container','График входящих/исходящих комментариев аккаунта @vik');

}

if("FLAG" in localStorage){
				var ch = localStorage.getItem("FLAG")
				buildChart(JSON.parse(ch),'flag-container','График взаимодействия ФЛАГОВ. (Для обновления проанализируйте аккаунт снова)');
} else {
buildChart(FallbackFLAG,'flag-container','График входящих/исходящих флагов аккаунта @vik');

}

function progressData() {
	function preRunSort(Arr,type){
			var CHART = [];
			var temp = {};
			var obj = null;
			for(var i=0; i < Arr.length; i++) {
			   obj=Arr[i];

			   if(!temp[obj.category]) {
				   temp[obj.category] = obj;
			   } else {
				   temp[obj.category]["column-2"] += obj["column-2"];
			   }
			}
			
			for (var prop in temp)
			
			CHART.push(temp[prop]);
			CHART.sort(sortFunction);

			function sortFunction(a, b) {
				if (a["column-2"] === b["column-2"]) {
					return 0;
				}
				else {
					return (a["column-2"] < b["column-2"]) ? -1 : 1;
				}
			}	
		
			if (type === "votes"){
			localStorage.setItem("VOTES", JSON.stringify(CHART));
			buildChart(CHART,'vote-container','График взаимодействия голосований, обмен голосами. @'+account);
			}
			
			if (type === "comments"){
			localStorage.setItem("COMMENTS", JSON.stringify(CHART));
			buildChart(CHART,'comments-container','График взаимодействия комментариев @'+account);
			}
			
			if (type === "flags"){
			localStorage.setItem("FLAG", JSON.stringify(CHART));
			buildChart(CHART,'flag-container','График взаимодействия флагов @'+account);
			}
			
			

		
		}
		
function deepSort(DATA,TYPE){
	
DATA.sort();

    var current = null;
    var cnt = 0;
	console.log(DATA,TYPE)
	
    for (var i = 0; i < DATA.length; i++) {
        if (DATA[i] != current) {
            if (cnt > 0) {
                var inp = { "category": current, "column-1": cnt, "column-2":0 };
				var out = { "category": current, "column-1": 0, "column-2": cnt };
				
				if (TYPE === "inVote"){chartItems.push(inp)};
				if (TYPE === "outVote"){chartItems.push(out)};
				
				if (TYPE === "inComm"){chartItemsComm.push(inp)};
				if (TYPE === "outComm"){chartItemsComm.push(out)};
				
				if (TYPE === "inFlag"){chartItemsFLAG.push(inp)};
				if (TYPE === "outFlag"){chartItemsFLAG.push(out)};
            }
            current = DATA[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
				var inp = { "category": current, "column-1": cnt, "column-2":0 };
				var out = { "category": current, "column-1": 0, "column-2": cnt };
				
				if (TYPE === "inVote"){chartItems.push(inp)};
				if (TYPE === "outVote"){chartItems.push(out)};
				
				if (TYPE === "inComm"){chartItemsComm.push(inp)};
				if (TYPE === "outComm"){chartItemsComm.push(out)};
				
				if (TYPE === "inFlag"){chartItemsFLAG.push(inp)};
				if (TYPE === "outFlag"){chartItemsFLAG.push(out)};
    }

}
	
	
	
	deepSort(inVote,"inVote");
	deepSort(outVote,"outVote");
	
	deepSort(inComm,"inComm");
	deepSort(outComm,"outComm");
	
	deepSort(inFlag,"inFlag");
	deepSort(outFlag,"outFlag");
	
	
	preRunSort(chartItems,'votes')
	preRunSort(chartItemsComm,'comments')
	preRunSort(chartItemsFLAG,'flags')
	
}


function buildChart(DATACHART,divID,title){
AmCharts.makeChart(divID,
				{
					"type": "serial",
					"pathToImages": "https://upvote.tk/img/",
					"categoryField": "category",
					"maxSelectedSeries": 10,
					"mouseWheelScrollEnabled": true,
					"rotate": true,
					"angle": 20,
					"autoMarginOffset": 5,
					"depth3D": 20,
					
					"zoomOutText": "",
					"startDuration": 1,
					"accessibleTitle": "",
					"color": "#3D3D3D",
					"fontFamily": "arial",
					"fontSize": 12,
					
					"theme": "light",
					"categoryAxis": {
						"gridPosition": "start",
						"offset": -1
					},
					"chartScrollbar": {
						"enabled": true,
						"hideResizeGrips": true,
						"resizeEnabled": false,
						"backgroundAlpha": 1,
						"backgroundColor": "#BCD0FF",
						"dragIcon": "",
						"graphFillAlpha": 0,
						"graphFillColor": "#091E51",
						"graphLineColor": "#4242FF",
						"gridAlpha": 1,
						"hideResizeGrips": true,
						"maximum": 1,
						"offset": 30,
						"scrollbarHeight": 20,
						"selectedBackgroundAlpha": 1,
						"selectedBackgroundColor": "#659CFF",
						"selectedGraphFillAlpha": 1,
						"selectedGraphFillColor": "#FF4949",
						"selectedGraphLineColor": "#FF5D5D",
						"updateOnReleaseOnly": true
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] >>> [[category]]:[[value]]",
							"color": "#333333",
							"fillAlphas": 1,
							"fillColors": "#5050FF",
							"fontSize": 12,
							"id": "AmGraph-1",
							"labelText": "[[value]]",
							"title": "Активность пользователя в ваш адрес",
							"type": "column",
							"lineColor": "#FFFFFF",
							"lineThickness": 0,
							"valueField": "column-1"
						},
						{
							"balloonColor": "#FF6161",
							"balloonText": "[[title]] >>> [[category]]:[[value]]",
							"bullet": "round",
							"bulletBorderColor": "#6E6EFF",
							"bulletColor": "#FF4343",
							"bulletHitAreaSize": 4,
							"bulletSize": 22,
							"columnWidth": 0,
							"fillColors": "#FF0000",
							"fontSize": 14,
							"id": "AmGraph-2",
							"labelOffset": -1,
							"labelText": "[[value]]",
							"lineColor": "#FF8A8A",
							"lineThickness": 2,
							"title": "Ваша активность в адрес пользователя",
							"valueField": "column-2"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"title": ""
						}
					],
					"allLabels": [],
					"balloon": {
						"animationDuration": 0,
						"fadeOutDuration": 0
					},
					"legend": {
						"enabled": true,
						"useGraphSettings": true
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 16,
							"text": title
						}
					],
					"dataProvider":DATACHART
				}
				
			);
			
			
			loadBar.remove('show');
			loaderplace.remove('bg');
			dynamic.remove('hide');
};







var getStat = function getStat(f) {

	steem.api.getAccountHistory(account, f, l, function (err, result) {
		if (err) {
			console.log(err);
		}
		
		var i = 0,n=result.length;
		for(i=0;n>i;i++){
			var x = result[i];
			var op = x[1].op[0];
			var G = x[1].op[1];
		if 
		(op === 'vote') {
					var voter = G['voter'];
					var author = G['author'];
					var power = G['weight'] > 1;
					var flag = G['weight'] < 0;
					
					if (author === account && power) {
						inVote.push(voter);
					} 
					if (voter === account && power) {
						outVote.push(author);
					} 
					
					
					if (author === account && flag){
						inFlag.push(voter);
					}
					if (voter === account && flag){
						outFlag.push(author);
					}
					
					
			} 
		else if
		(op === 'comment') {
				
				
				if(G['parent_author'] === account){
						inComm.push(G['author'])
				}else if(G['parent_author'] !== "" && G['author'] === account){
						outComm.push(G['parent_author'])
				}
				
					
							
			
				
			}

			
				
		}
	

		var last = result[result.length - 1][0];
		if (last === f) {

			f = f + l;
			getStat(f);
		} else if (last < f) {
			progressData();
			
		}
});
}
	
function run(){


loadBar.add('show')
loaderplace.add('bg');
dynamic.add('hide');


l = 2000;
f = l;
next = 0;
mostpopular = [];
chartItems = [];
chartItemsComm = [];
chartItemsFLAG = [];
outVote = [];
inVote = [];
inComm = [];
outComm = [];
inReblog = [];
outReblog = [];
inFlag = [];
outFlag = [];
mostTags = [];
acc = document.getElementById("login").value;
account = acc.toLowerCase().replace("@", "");
getStat(f);
}	
