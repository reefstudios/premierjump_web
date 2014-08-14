ig.module('game.game')
.requires(
	'impact.entity',
	'game.player',
	'game.block',
	'game.bucket',
	'game.bucket_alert',
	'game.background',
	'game.tutorial',
	'game.pause',
	'game.cloud',
	'game.sun',
	'game.hard_mode_dialog',
	'game.saveLive',
	'game.stormy_cloud'
).defines(function () {
		Game = ig.Entity.extend({
	        size: {
	            x: 0,
	            y: 0
	        },
			zIndex:2,
			//animSheet: new ig.AnimationSheet(Configs.img_background, Configs.SCREEN_WIDTH, 8782),
			font: new Font( '40px Garamond' ),
			savelives:[],
			maxLiveCount:0,
			//scoreboard
			gameLevel:1,
			vNextCount:0,
			bucket_alert:null,
			bucket:null,
			showed_tutorial:false,
			tutorial:null,
			hard_mode_dialog:null,
			pause_screen:null,
			pause_state :false,
			pause_btn:null,
			background : null,
			temp_background:null,
			sun:null,
			cloud_pos_y:Configs.SCREEN_HEIGHT-Configs.SCREEN_HEIGHT/5,
			cloud_list:[],
			rains_list:[],
			cloud_count:4,
			bucket_timer :new ig.Timer(0.1),
			bucket_delay_time:0,
			bucket_delay_limit:0,
			bucket_delay_limit_init:0,
			bucket_delay_fixed:0,
			////
			init: function( x, y, settings ) {
				// Add animations for the animation sheet
				// Call the parent constructor
				this.parent( x, y, settings );
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
				if(APP_DATA.DIFFICULTY_LEVEL == 1){
					this.bucket_delay_limit_init = 11;
					this.maxLiveCount = 2;
				}else if(APP_DATA.DIFFICULTY_LEVEL == 2){
					this.bucket_delay_limit_init = 8.5;
					this.maxLiveCount = 1;
				}else if(APP_DATA.DIFFICULTY_LEVEL == 3){
					this.bucket_delay_limit_init = 6.5;
					this.maxLiveCount = 0;
				}
				this.bucket_delay_limit = this.bucket_delay_limit_init;
	            //this.addAnim('idle', 1, [0]);
	            
			},
			update: function() {
				if(this.pause_state){
					if(this.pause_btn){
					 this.pause_btn.pos.x =-200;
					}
				}else{
					if(this.pause_btn){
						this.pause_btn.pos.x = 10;
					}
				}
				this.parent();
				/*if( ig.input.pressed('click')) 
				{
					if(this.pause_state) return;
					this.setPause(true);
				}*/
				if(APP_DATA.SETTINGS_TUTORIAL_STATE && !this.tutorial && !this.showed_tutorial){
					this.tutorial = ig.game.spawnEntity(Tutorial,44,80);
					this.pause_state = true;
					this.showed_tutorial = true;
				}
				/*if(APP_DATA.DIFFICULTY_LEVEL != 3 && APP_DATA.HARD_MODE_STATE && !APP_DATA.HARD_MODE_DIALOG_SHOWED && this.hard_mode_dialog == null ){
					this.hard_mode_dialog = ig.game.spawnEntity(HardModeDialog,50,ig.game.screen.y+140);
					this.pause_state = true;
					APP_DATA.HARD_MODE_DIALOG_SHOWED = true;
					SaveAppData();
				}*/
				if(!ig.game.showPlayer){
					ig.game.player = ig.game.spawnEntity(Player,Configs.SCREEN_WIDTH/2,Configs.SCREEN_HEIGHT);
					ig.game.showPlayer = true;
				}
				if(this.bucket_timer.delta() >0  && ig.game.player.jump_count){ // when timer has ticked for  a second
			        this.bucket_delay_time +=0.1;
			        this.bucket_timer.reset() // res
			    }
				if(!this.background && this.background == null){
					this.background = ig.game.spawnEntity(Background,0,-7805+Configs.SCREEN_HEIGHT);
					if(APP_DATA.DIFFICULTY_LEVEL == 3){
						this.sun = ig.game.spawnEntity(Sun,20,this.background.pos.y+1000);
					}else{
						this.sun = ig.game.spawnEntity(Sun,20,this.background.pos.y+6000);
					}
				}
				if(ig.game.blocks.length < ig.game.block_count){
					for ( i = 0 ; i < ig.game.block_count - ig.game.blocks.length ; i++){
						var block = ig.game.spawnEntity(Block);
						block.update();
						block.draw();
						ig.game.blocks.push(block);
					}
				}
				if(APP_DATA.DIFFICULTY_LEVEL == 3){
					if(ig.game.screen.y-this.background.pos.y < 5000){
						if(this.cloud_list.length < this.cloud_count){
							var cloud = ig.game.spawnEntity(Cloud);
							this.cloud_list.push(cloud);
						}
					}
				}else{
					if(ig.game.screen.y-this.background.pos.y > 2000 ){
						if(this.cloud_list.length < this.cloud_count){
							var cloud = ig.game.spawnEntity(Cloud);
							this.cloud_list.push(cloud);
						}
					}
				}
				if(this.background.pos.y > ig.game.screen.y){
					if(!this.temp_background && this.temp_background == null){
						this.temp_background = ig.game.spawnEntity(Background,0,-7805+this.background.pos.y);
					}
				}
				//console.log(ig.game.screen.y);
				if(this.background.pos.y > ig.game.screen.y+Configs.SCREEN_HEIGHT){
					this.background.kill();
					this.background = this.temp_background;
					if(APP_DATA.DIFFICULTY_LEVEL == 3){
						this.sun = ig.game.spawnEntity(Sun,20,this.background.pos.y+1000);
					}else{
						this.sun = ig.game.spawnEntity(Sun,20,this.background.pos.y+6000);
					}
					this.temp_background = null;
					if(!APP_DATA.HARD_MODE_STATE && APP_DATA.DIFFICULTY_LEVEL == 2){
						APP_DATA.HARD_MODE_STATE = true;
						SaveAppData();
					}
				}
				//console.log(7805-(ig.game.screen.y-this.background.pos.y));
				this.bucket_delay_limit = this.bucket_delay_limit_init -(7805-(ig.game.screen.y-this.background.pos.y))/1000;
				if(ig.game.screen.y-this.background.pos.y < 3900 && !this.bucket_delay_fixed){
					this.bucket_delay_fixed = this.bucket_delay_limit;
				}
				if(this.bucket_delay_fixed){
					this.bucket_delay_limit = this.bucket_delay_fixed;
				}
				//console.log(this.bucket_delay_limit);
				if(this.bucket_delay_time > this.bucket_delay_limit && !this.bucket){
					var bucket_posX = Math.random()*(Configs.SCREEN_WIDTH-200);
					if(APP_DATA.GAME_SETTINGS.game_obstacle == 1){
						this.bucket = ig.game.spawnEntity(Bucket,bucket_posX,ig.game.player.pos.y-1500);
					}else if(APP_DATA.GAME_SETTINGS.game_obstacle == 2){
						this.bucket = ig.game.spawnEntity(Stormy_Cloud,bucket_posX,ig.game.player.pos.y-1500);	
					}
					
					if(!this.bucket_alert){
						this.bucket_alert = ig.game.spawnEntity(Bucket_Alert,bucket_posX,ig.game.screen.y);
					}
					
				}
				if(!this.pause_btn){
					this.pause_btn = ig.game.spawnEntity( Button, 10,10,{
						  font: new Font( '30px sans-serif' ),
						  text: '',
						  textAlign: "left",
						  zIndex:100,
						  size: { x: 80, y: 80},
						  animSheet: new ig.AnimationSheet( Configs.img_pause_btn, 80, 80),
						  pressedDown: function() {
						  },
						  pressed: function() {
						  },
						  pressedUp: function() {
						  	 ig.game.game.setPause(true);
						  }
					});					
				}
				ig.game.sortEntities();	
				ig.game.player.update();
			},
			draw:function(){
				this.parent();
				this.font.draw("lives:",100,22,"left","#FFFFFF");
				this.font.draw(ig.game.SCORE.formatScore(0,",",'.'), Configs.SCREEN_WIDTH-10 ,10,"right","#FFFFFF");
			},
			addLive:function(){
				if(this.savelives.length < this.maxLiveCount)
				{
				  px = 190;
				  if(this.savelives.length > 0){
				  	 px = this.savelives[this.savelives.length-1].pos.x+40;
				  }
		  	  	  p_save = ig.game.spawnEntity( saveLive,px,ig.game.screen.y+33);
		  	  	  this.savelives.push(p_save);
				}
			},
			setPause : function(state){
				if(state){
          			this.pause_screen = ig.game.spawnEntity(Pause,50,ig.game.screen.y+140);
				}else{
					if(this.pause_screen){
						this.pause_screen.kill();
						this.pause_screen = null;
					}
				}
				this.pause_state = state;
			},
 		   close_tutorial:function(){
 		   	   this.tutorial.kill();
 		   	   this.tutorial = null;
 		   	   if(!this.hard_mode_dialog){
 		   	   	this.pause_state = false;
 		   	   }
 		   },
 		   close_hard_mode_dialog:function(){
 		   	   if(!this.tutorial){
	 		   	   this.hard_mode_dialog.kill();
 		   	   	   this.pause_state = false;
 		   	   }
 		   },
 		   kill:function(){
 		   	    this.parent();
				if(ig.game.player != undefined || ig.game.player!= null ){
					ig.game.player.kill();
					ig.game.player = null;
				}
				if(this.background != undefined  || this.background != null ){
					this.background.kill();
					this.background = null;
				}
				if(this.temp_background != undefined  || this.temp_background != null ){
					this.temp_background.kill();
					this.temp_background = null;
				}
				if(this.sun != undefined  || this.sun != null ){
					this.sun.kill();
					this.sun = null;
				}
				if(this.hard_mode_dialog != undefined  || this.hard_mode_dialog != null ){
					this.hard_mode_dialog.kill();
					this.hard_mode_dialog = null;
				}
				if(this.tutorial != undefined  || this.tutorial != null ){
					this.tutorial.kill();
					this.tutorial = null;
				}
				
				if(this.bucket_alert != undefined || this.bucket_alert != null ){
					this.bucket_alert.kill();
				}
				if(this.bucket != undefined || this.bucket  != null){
					this.bucket.kill();
				}
				if(this.pause_screen != undefined || this.pause_screen != null ){
					this.pause_screen.kill();
				}
				if(this.pause_btn != undefined || this.pause_btn != null){
					this.pause_btn.kill();
				}
				for (i = 0 ; i < this.rains_list.length ; i++){
					this.rains_list[i].kill();
				}
				this.rains_list = [];
				for (i = 0 ; i < this.cloud_list.length ; i++){
					this.cloud_list[i].kill();
				}
				this.cloud_list = [];
				for (i = 0 ; i < ig.game.blocks.length ; i++){
					ig.game.blocks[i].kill();
				}
				this.blocks = [];
				
 		   }
		});
});

