ig.module('game.hard_mode_dialog').requires('impact.entity','plugins.button','plugins.font').defines(function () {
		HardModeDialog = ig.Entity.extend({

			size:{x:540,y:400},
			zIndex:10,
			title_font      :new Font( '28px Garamond' ),
			text_font       :new Font( '28px Garamond' ),
			animSheet: new ig.AnimationSheet( Configs.img_question_back, 540, 400),
			setting_btn:null,	
			init: function( x, y, settings ) {
				// Add animations for the animation sheet
				// Call the parent constructor
				this.parent( x, y, settings );
	            this.addAnim('back', 1, [0]);
	            this.setting_btn = ig.game.spawnEntity( Button, this.pos.x+this.size.x/2-40,this.pos.y+220,{
					  font: new Font( '30px Garamond' ),
					  text: '',
					  textAlign: "left",
					  zIndex:11,
					  size: { x: 80, y: 80},
					  animSheet: new ig.AnimationSheet( Configs.img_setting_btn, 80, 80),
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					  	  ig.game.goSettingScreen();
					  }
					});
		},
			update: function() {
				this.parent();
				if( ig.input.pressed('click') && !this._inThis()) 
				{
					ig.game.game.close_hard_mode_dialog();
				}

				//ig.game.sortEntities();
			},
			draw:function(){
		        ig.system.context.globalAlpha = 0.75;
				this.parent();
		        ig.system.context.globalAlpha = 1;
	   		 	this.title_font.draw("YOU HAVE UNLOCKED HARD MODE!", Configs.SCREEN_WIDTH/2 ,200,"center","#FFFFFF")
	   		 	this.text_font.draw("Please go to settings to turn hard mode on", Configs.SCREEN_WIDTH/2 ,260,"center","#FFFFFF")
			},
			_inThis: function() {
		      return ig.input.mouse.x*1/ratio + ig.game.screen.x > this.pos.x && 
		             ig.input.mouse.x*1/ratio + ig.game.screen.x < this.pos.x + this.size.x &&
		             ig.input.mouse.y*1/ratio + ig.game.screen.y > this.pos.y && 
		             ig.input.mouse.y*1/ratio + ig.game.screen.y < this.pos.y + this.size.y;
    		},
   		   kill:function(){
   		 	 this.parent();
   		 	 this.setting_btn.kill();
   		 	}
	});
});
	