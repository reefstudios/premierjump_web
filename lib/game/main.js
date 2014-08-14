ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.game',
	'game.gameover',
	'game.configs'
)
.defines(function(){
GameLoader = ig.Loader.extend({
	draw:function(){
		var w = ig.system.realWidth;
		var h = ig.system.realHeight;
		ig.system.context.font = '30px Garamond';
		loading_str = "Loading ...";
		str_width = ig.system.context.measureText(loading_str).width / ig.system.scale;
		ig.system.context.fillStyle = '#ffffff';
		ig.system.context.fillText(loading_str,w/2-str_width/2,h/2);
	}
});

EmptyGame = ig.Game.extend({
	init:function(){
	}
});
MyGame = ig.Game.extend({
	game		: null,
	game_over   : null,
	screen_state:'',
	bStart		: false,
	block_count :10,	
	blocks      :[],
	SCORE       :0,
	block_pos_y :Configs.SCREEN_HEIGHT-Configs.SCREEN_HEIGHT/10,
	showPlayer:false,
	player     :null,
	//// Question
	correctAnswer: 0,
	totalQuestion: 0,
	LockQuestionCount : 0,
	m_timer:new ig.Timer(100),

//----------------------------------------------------------------------------------------------------------------------------------
	init: function() {
		doResize();
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.input.initMouse();
		ig.input.bind(ig.KEY.ESC, 'esc');
		for ( i = 0 ; i < APP_DATA.QUESTION_LIST.length ; i ++)
	    {
	    	if(APP_DATA.QUESTION_LIST[i].status != "success"){
	    		this.LockQuestionCount++;
	    	}
	    }
		this.game_id = null;
		this.onNewGame();
		this.sendGameToServer();
	},
//----------------------------------------------------------------------------------------------------------------------------------
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		if(this.m_timer.delta() >0){ // when timer has ticked for  a second
        	this.m_timer.reset() // res
        	this.sendGameToServer();
	    }
	    //console.log(this.game_id);
        if (ig.input.pressed('esc')) {
               ig.game.onBackButton();
		}
	},
//----------------------------------------------------------------------------------------------------------------------------------
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	},
//----------------------------------------------------------------------------------------------------------------------------------
	onNewGame : function(){
		this.screen_state = "game";
		if(this.game_over != undefined || this.game_over != null){
			this.game_over.kill();
			this.game_over = null;
		}
		if(this.game != undefined || this.game != null ){
			this.game.kill();
			this.game = null;
		}
		this.blocks = [];
		this.showPlayer = false;
		this.player = null;
		this.SCORE = 0;
		this.correctAnswer = 0;
		this.totalQuestion = 0;
		this.block_pos_y = Configs.SCREEN_HEIGHT-Configs.SCREEN_HEIGHT/10;	
		if(ig.game){
			ig.game.screen.x = 0;
			ig.game.screen.y = 0;
		}
		
		this.game = this.spawnEntity(Game, 0, 0);
	},
//----------------------------------------------------------------------------------------------------------------------------------
	onGameOver : function(){
		this.screen_state = "game_over";
		sound_play("loose_game");
		if(this.game_over != undefined || this.game_over != null){
			this.game_over.kill();
			this.game_over = null;
		}
		if(this.game!= undefined || this.game!= null ) {
			this.game.kill();
			this.game = null;
		}
		this.game_over = this.spawnEntity(GameOver, 0, 0);

	},
	onBackButton:function(){
		if(this.screen_state == "game"){
			if(this.game.hard_mode_dialog){
				this.game.hard_mode_dialog.kill();
				this.game.hard_mode_dialog = null;
			}
			if(this.game.tutorial){
				this.game.tutorial.kill();
				this.game.tutorial = null;
			}
			if(this.game.pause_state){
				this.game.setPause(false);
			}else{
				this.game.setPause(true);
			}
		}else if(this.screen_state == "game_over" ){
		    if(this.game_over != undefined || this.game_voer != null){
				this.game_over.kill();
			}
			this.goMainScreen();
		}
	},
	goMainScreen:function(){
		if(this.game != undefined || this.game != null ){
			this.game.kill();
			this.game = null;
		}
		if(this.game_over != undefined || this.game_voer != null){
			this.game_over.kill();
			this.game_over = null;
		}
		ig.system.setGame(EmptyGame);
		$.mobile.changePage("#index",{transition:"none",changeHash:false});
	},
	goSettingScreen:function(){
		if(this.game != undefined || this.game != null ){
			this.game.kill();
			this.game = null;
		}
		if(this.game_over != undefined || this.game_voer != null){
			this.game_over.kill();
			this.game_over = null;
		}
		$.mobile.changePage("#setting_page",{transition:"none",changeHash:false});
	},
	sendGameToServer:function(){
		$.ajax({
			url:API_URL+"/api",
			data:{"option":"insert_games","token":APP_DATA.user_token,"usertype":APP_DATA.USER_TYPE,"region":region_list[APP_DATA.USER_REGION],"level":APP_DATA.DIFFICULTY_LEVEL,"gameid":this.game_id},
			type:"post",
			dataType:"JSON",
			success:function(response){
				ig.game.game_id = response.gameid;
			},
			error:function(error){
				//console.log(JSON.stringify(error));
			}
		});
	}
});


// Start the Game with 60fps, a resolution of 480x320, scaled
// up by a factor of 1
//ig.System.resize();
//ig.main( '#canvas', MyGame, 60, Configs.SCREEN_WIDTH, Configs.SCREEN_HEIGHT, 1 );
});
