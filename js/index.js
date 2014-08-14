var region_list = ["APAC","Canada","CEE","France","Germany","Greater China","India","Japan","Latam","MEA","US","UK","Western Europe"];
var user_type_list = ['','TAM','Seller','Other'];
var user_diff_list = ['','Easy','Medium','Hard'];
var API_URL = "admin_leaderboard/index.php?";
var APP_DATA = {};
var SAVED_TYPE_AREA = false;
var default_question_list = null;
var is_Logged = false;
	var temp_app_data = null;
    var watchID = null;
	var game_media = [];
	var audio_control ;
	var score_label = [];
	score_label[1] = "Easy";
	score_label[2] = "Medium";
	score_label[3] = "Hard";
function sound_play(flag){
	if(!APP_DATA.SETTINGS_SOUNDS_STATE) return;
     audio_control.pause();
     audio_control.src = game_media[flag];
     audio_control.play();
}

$(function(){
    game_media["jump"] = "res/sound/jump.mp3";
    game_media["tam"]= "res/sound/TAMassist.mp3";
    game_media["question_popup"]  = "res/sound/question_popup.mp3";
    game_media["correct_answer"] = "res/sound/correct_answer.mp3";
    game_media["wrong_answer"] = "res/sound/wrong_answer.mp3";
    game_media["rocket_boost"] = "res/sound/rocket_boost.mp3";
    game_media["loose_game"] = "res/sound/loose_game.mp3";
    audio_control = document.getElementById("audio_control");
	
	//// Get APP Data form localstorage
	APP_DATA = getAppData();
	if(APP_DATA.HIGH_SCORE == undefined){
		APP_DATA.HIGH_SCORE = [];
		APP_DATA.HIGH_SCORE[1] = 0;
		APP_DATA.HIGH_SCORE[2] = 0;
		APP_DATA.HIGH_SCORE[3] = 0;
	}
	if(APP_DATA.SETTINGS_SOUNDS_STATE == undefined){
		APP_DATA.SETTINGS_SOUNDS_STATE = true;
	}
	if(APP_DATA.SETTINGS_QUESTIONS_STATE == undefined){
		APP_DATA.SETTINGS_QUESTIONS_STATE = true;
	}
	if(APP_DATA.SETTINGS_TUTORIAL_STATE == undefined){
		APP_DATA.SETTINGS_TUTORIAL_STATE = true;
	}
	if(APP_DATA.DIFFICULTY_LEVEL == undefined){
		APP_DATA.DIFFICULTY_LEVEL = 2;
	}
	if(APP_DATA.HARD_MODE_STATE == undefined){
		APP_DATA.HARD_MODE_STATE = false;
	}
	if(APP_DATA.HARD_MODE_DIALOG_SHOWED == undefined){
		APP_DATA.HARD_MODE_DIALOG_SHOWED = false;
	}
	if(APP_DATA.QUESTION_LIST == undefined){
	//	APP_DATA.QUESTION_LIST = default_question_list;
	}
	if(APP_DATA.USER_TYPE == undefined){
		APP_DATA.USER_TYPE = 3;
	}else{
		SAVED_TYPE_AREA = true;
	}
	if(APP_DATA.USER_REGION == undefined){
		APP_DATA.USER_REGION = 0;
	}
	APP_DATA.USER_NAME = "premier";
	APP_DATA.PASSWORD = "jump";
	
//// Game Page/////////	
	$("#game_page").on("pageshow",function(){
		APP_DATA.QUESTION_LIST = default_question_list;
		if(!ig.game){
			ig.main( '#canvas', MyGame, 30, Configs.SCREEN_WIDTH, Configs.SCREEN_HEIGHT, 1,GameLoader );
		}else{
			ig.system.setGame(MyGame);
			//ig.game.onNewGame();
		}
	});
	$("#login_btn").on("click",function(){
		if($("#login_user").val() == APP_DATA.USER_NAME && $("#user_password").val() ==APP_DATA.PASSWORD ){
			is_Logged = true;
			$.mobile.changePage("#index",{transition:"none",changeHash:false});
		}else{
			alert("incorrect username or password!");
		}
	});
/////////////////////
	$("#index").on("pageshow",function(){
		show_progress();
	});
	$("input").blur(function(){
			doResize();
	});
	window.setInterval(getGameSettings,8000);
	doResize();
});


function start_game(){
	if(APP_DATA.GAME_SETTINGS.game_turn_status == 1){
		$.mobile.changePage("#game_page",{transition:"none",changeHash:false});
	}else{
		alert("Sorry,Can't play game now!");
	}
	
}
function show_progress(){
	d = new Date();
	$.ajax({
		url:API_URL+"/api",
		data:{"option":"all","timestamp":d.getTime()},
		type:"post",
		dataType:"JSON",
		success:function(response){
			default_question_list = response;
			APP_DATA.QUESTION_LIST = response;
		},
		error:function(error){
			alert("Oops, there was a network connection error. Please try again.");
		}
	});
	$("#score_div").html('<div style = "display:table-cell;vertical-align:middle;">Last Score</br>'+APP_DATA.HIGH_SCORE[APP_DATA.DIFFICULTY_LEVEL].formatScore(0,",",'.')+'</div>');

}
function show_index_page(tran_flag){
	$.mobile.changePage("#index",{changeHash:false});
}
function setting_save(tran_flag){
	APP_DATA = temp_app_data;
	SaveAppData();
	show_index_page(tran_flag);
}
function setting_cancel(tran_flag){
	temp_app_data = null;
	show_index_page(tran_flag);
}
getAppData = function(){
	data = window.localStorage.getItem("_localAppData");
	if(data == null){
		data = "{}";
	}
	return JSON.parse(data);
}
SaveAppData = function(){
    window.localStorage.setItem('_localAppData', JSON.stringify(APP_DATA));
}
 Number.prototype.formatScore = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
}
;(function($) {
    $.fn.textfill = function(options) {
        var fontSize = options.maxFontPixels;
        var ourText = $('span:visible:first', this);
        var maxHeight = $(this).height();
        var maxWidth = $(this).width();
        var textHeight;
        var textWidth;
        do {
            ourText.css('font-size', fontSize);
            textHeight = ourText.height();
            textWidth = ourText.width();
            fontSize = fontSize - 1;
        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
        return this;
    }
})(jQuery)

	var surface = null;
	var page_obj = null;
	var ratio = 1;
    window.addEventListener("resize", doResize, false);
    window.addEventListener("orientationchange", doResize, false);
    device_ratio = 1;
    var ratioW = 1;
    var ratioH = 1;
	function doResize()
	{
		if($("input").is(":focus")) return;
		var minRatio = 0.1;
		
		if(!surface)
			surface = document.getElementById("canvas");
		if(!page_obj)
			page_obj = document.getElementById("index");
		var dev_width = window.innerWidth;
		var dev_hight = window.innerHeight;
		
		
		ratioW = dev_width / 640;
		ratioH = dev_hight / 1138;
		ratio = ratioH > ratioW ? ratioW : ratioH;
		ratio = ratio > minRatio ? ratio : minRatio;
		var org_x = (dev_width - 640* ratio )/2;
		var org_y = (dev_hight - 1138 * ratio )/2;
		
		css_txt=
			'position: absolute;'+
			'left:'+org_x+'px !important;'+
				'top:'+org_y+'px;'+
				'-webkit-transform: scale(' + ratio + ', ' + ratio + ');'+
				'-webkit-transform-origin: 0% 0%;'+
				'-moz-transform: scale(' + ratio + ', ' + ratio + ');' +
				'-moz-transform-origin: 0% 0%;' +
				'-ms-transform: scale(' + ratio + ', ' + ratio + ');' +
				'-ms-transform-origin:  0% 0%;';
		page_obj.style.cssText = css_txt;
		(document.getElementById("login")).style.cssText = css_txt;;	
		ratioW = dev_width / surface.width;
		ratioH = dev_hight / surface.height;
		ratio = ratioH > ratioW ? ratioW : ratioH;
		ratio = ratio > minRatio ? ratio : minRatio;
		
		org_x = (dev_width - surface.width * ratio )/2;
		org_y = (dev_hight - surface.height * ratio )/2;
		css_txt=
			'position: absolute;'+
			'left:'+org_x+'px;'+
				'top:'+org_y+'px;'+
				'-webkit-transform: scale(' + ratio + ', ' + ratio + ');'+
				'-webkit-transform-origin: 0% 0%;'+
				'-moz-transform: scale(' + ratio + ', ' + ratio + ');' +
				'-moz-transform-origin: 0% 0%;' +
				'-ms-transform: scale(' + ratio + ', ' + ratio + ');' +
				'-ms-transform-origin:  0% 0%;';
		
		surface.style.cssText = css_txt;
		$("#user_name").css("left",org_x);
		window.top.scrollTo(0, 1);
	} // end function
function getGameSettings(){
		d = new Date();
		$.ajax({
			url:API_URL+"/api",
			data:{"option":"game_setting","timestamp":d.getTime()},
			type:"post",
			dataType:"JSON",
			success:function(response){
				APP_DATA.GAME_SETTINGS = response;
				//$(".turnoff_img").attr("src","admin_leaderboard/upload/turnoff_img.png?"+d.getTime());
				if(APP_DATA.GAME_SETTINGS.use_turnoff_img == 1){
					$("#turnoff_div").css('background-image','url("admin_leaderboard/upload/turnoff_img.png?'+d.getTime()+'")');
				}else{
					$("#turnoff_div").css('background-image','url("res/images/turnoff.png")');
					
				}
				if(APP_DATA.GAME_SETTINGS.game_turn_status == 1){
					//$("#start_div").show();
					//$(".turnoff_img").hide();
					$("#turnoff_div").hide();
				}else{
					//$("#start_div").hide();
					//$(".turnoff_img").show();
					$("#turnoff_div").show();
					
				}
			},
			error:function(error){
				$(".turnoff_img").attr("src","admin_leaderboard/upload/turnoff_img.png?"+d.getTime());
				$("#start_div").hide();
				$(".turnoff_img").show();
			}
		});
}
function activate_hardmode(){
	APP_DATA.HARD_MODE_STATE = true;
	APP_DATA.DIFFICULTY_LEVEL = 3;
	SaveAppData();
	$('#setting_unlock_dialog').hide();
	$("#setting_page").trigger("pageshow");
}
