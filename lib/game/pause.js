ig.module('game.pause').requires('impact.entity','plugins.button','plugins.font').defines(function () {
		Pause = ig.Entity.extend({

			// Set some of the properties
			size:{x:540,y:800},
			zIndex:10,
			answer_result   :false,
			question_index  :null,
			title_font      :new Font( '20px Garamond' ),
			text_font       :new Font( '60px Garamond' ),
			button_font    	:new Font( '40px Garamond' ),
			animSheet: new ig.AnimationSheet( Configs.img_question_back, 540, 800),
			btn_list  :[],
			init: function( x, y, settings ) {
				// Add animations for the animation sheet
				// Call the parent constructor
				this.parent( x, y, settings );
	            this.addAnim('back', 1, [0]);
	            var resume_btn = ig.game.spawnEntity( Button, this.pos.x+50,this.pos.y+200,{
					  font: this.button_font,
					  text: '',
					  textAlign: "right",
					  zIndex:11,
					  size: { x: 225, y: 80},
					  animSheet: new ig.AnimationSheet( Configs.img_pause_resume_btn, 80, 80),
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					  	  ig.game.game.setPause(false);
					  }
					});
				this.btn_list.push(resume_btn);
	            var again_btn = ig.game.spawnEntity( Button, this.pos.x+50,this.pos.y+350,{
					  font: this.button_font,
					  text: '',
					  textAlign: "right",
					  zIndex:11,
					  size: { x: 210, y: 80},
					  animSheet: new ig.AnimationSheet( Configs.img_pause_again_btn, 80, 80),
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					  	 ig.game.onNewGame();
					  }
					});
				this.btn_list.push(again_btn);
	            var menu_btn = ig.game.spawnEntity( Button, this.pos.x+50,this.pos.y+500,{
					  font: this.button_font,
					  text: '',
					  textAlign: "right",
					  zIndex:11,
					  size: { x: 190, y: 80},
					  animSheet: new ig.AnimationSheet( Configs.img_pause_menu_btn, 80, 80),
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					  	  ig.game.goMainScreen();
					  }
					});
				this.btn_list.push(menu_btn);
	            var sound_btn = ig.game.spawnEntity( Button, this.pos.x+50,this.pos.y+650,{
						  font: this.button_font,
						  text: '',
						  textAlign: "right",
						  zIndex:11,
						  size: { x: APP_DATA.SETTINGS_SOUNDS_STATE ? 180 :225, y: 80},
						  animSheet: new ig.AnimationSheet( APP_DATA.SETTINGS_SOUNDS_STATE ? Configs.img_pause_mute_btn :Configs.img_pause_unmute_btn, 80, 80),
						  pressedDown: function() {
						  },
						  pressed: function() {
						  },
						  pressedUp: function() {
						  	  this.kill();
						  	  ig.game.game.pause_screen.setMusicState();
						  }
						});
				this.btn_list.push(sound_btn);
		},
			update: function() {
				this.parent();
				//ig.game.sortEntities();
			},
			draw:function(){
		        ig.system.context.globalAlpha = 0.75;
				this.parent();
		        ig.system.context.globalAlpha = 1;
	   		 	this.title_font.draw("PREMIER JUMP", this.pos.x -ig.game.screen.x+50,this.pos.y -ig.game.screen.y+55,"left","#FFFFFF");
	   		 	this.text_font.draw("pause", this.pos.x -ig.game.screen.x+50 ,this.pos.y -ig.game.screen.y+60,"left","#FFFFFF");
				this.button_font.draw("Resume",this.pos.x-ig.game.screen.x+140,this.pos.y -ig.game.screen.y+215,"left","#FFFFFF");
				this.button_font.draw("Restart",this.pos.x-ig.game.screen.x+140,this.pos.y -ig.game.screen.y+365,"left","#FFFFFF");
				this.button_font.draw("Menu",this.pos.x-ig.game.screen.x+140,this.pos.y -ig.game.screen.y+515,"left","#FFFFFF");
				this.button_font.draw(APP_DATA.SETTINGS_SOUNDS_STATE ? 'Mute' :'Unmute',this.pos.x-ig.game.screen.x+140,this.pos.y -ig.game.screen.y+665,"left","#FFFFFF");
			},
			setMusicState:function(){
				if(APP_DATA.SETTINGS_SOUNDS_STATE){
					APP_DATA.SETTINGS_SOUNDS_STATE = false;
				}else{
					APP_DATA.SETTINGS_SOUNDS_STATE = true;
				}
				SaveAppData();
				this.btn_list.splice(3,1);
	            var sound_btn = ig.game.spawnEntity( Button, this.pos.x+50,this.pos.y+650,{
					  font: this.button_font,
					  text: '',
					  textAlign: "right",
					  zIndex:11,
					  size: { x: APP_DATA.SETTINGS_SOUNDS_STATE ? 180 :225, y: 80},
					  animSheet: new ig.AnimationSheet( APP_DATA.SETTINGS_SOUNDS_STATE ? Configs.img_pause_mute_btn :Configs.img_pause_unmute_btn, 80, 80),
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					  	  this.kill();
					  	  ig.game.game.pause_screen.setMusicState();
					  }
					});
			this.btn_list.push(sound_btn);
				
			},
   		   kill:function(){
   		 	 this.parent();
   		 	 for ( i = 0 ; i < this.btn_list.length ; i ++){
   		 	 	 this.btn_list[i].kill();
   		 	 }
   		 	 this.btn_list = [];
   		 }
	});
});
	