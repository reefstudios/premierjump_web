ig.module('game.gameover').requires('impact.entity','impact.font','plugins.font','plugins.button').defines(function () {
		GameOver = ig.Entity.extend({

			// Set some of the properties
			size: { x: 640, y: 1138},
			againBtn       :null,
			font		   : new Font( '80px Garamond' ),
			height_title_font     : new Font( '44px Garamond' ),
			personal_font  :new Font( '28px Garamond' ),
			answer_title_font  :new Font( '44px Garamond' ),
			progress_title_font :new Font( '35px Garamond' ),	
			imgBackground         : new ig.Image(Configs.img_gameover),
			imgProgress_wrapper	  : new ig.Image(Configs.img_go_progress_wrapper),
			imgProgress	  : new ig.Image(Configs.img_go_progress),
			init: function( x, y, settings ) {
				// Add animations for the animation sheet
				// Call the parent constructor
				this.parent( x, y, settings );
				this.submitBtn = ig.game.spawnEntity( Button, 90,820, {
				  font: new Font( '75px Garamond' ),
				  text: '',
				  textAlign: "center",
				  zIndex:10,
				  size: { x: 460, y: 87},
				  animSheet: new ig.AnimationSheet( Configs.img_submit_btn, 460, 87),
				  pressedDown: function() {
				  },
				  pressed: function() {
				  },
				  pressedUp: function() {
						$.ajax({
							url:API_URL+"/api",
							data:{"option":"insert_highscore","name":$("#user_name").val(),"region":region_list[APP_DATA.USER_REGION],"score":ig.game.SCORE,"usertype":APP_DATA.USER_TYPE,"level":APP_DATA.DIFFICULTY_LEVEL},
							type:"post",
							dataType:"JSON",
							success:function(response){
								ig.game.goMainScreen();
							},
							error:function(error){
								alert("Oops, there was a network connection error. Please try again.");
							}
						});
				  }
				});

				this.mainBtn = ig.game.spawnEntity( Button, 90,960, {
				  font: new Font( '75px Garamond' ),
				  text: '',
				  textAlign: "center",
				  zIndex:11,
				  size: { x: 224, y: 84},
				  animSheet: new ig.AnimationSheet( Configs.img_main_menu_btn, 224, 84),
				  pressedDown: function() {
				  },
				  pressed: function() {
				  },
				  pressedUp: function() {
				     ig.game.goMainScreen();
				  }
				});
				if(APP_DATA.GAME_SETTINGS.game_turn_status == 1){
					this.againBtn = ig.game.spawnEntity( Button, 325,960, {
					  font: new Font( '75px Garamond' ),
					  text: '',
					  textAlign: "center",
					  zIndex:11,
					  size: { x: 224, y: 84},
					  animSheet: new ig.AnimationSheet( Configs.img_again_btn, 224, 84),
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					     ig.game.onNewGame();
					  }
					});
			  }
			if(ig.game.SCORE > APP_DATA.HIGH_SCORE[APP_DATA.DIFFICULTY_LEVEL]){
				APP_DATA.HIGH_SCORE[APP_DATA.DIFFICULTY_LEVEL] = ig.game.SCORE;
				SaveAppData();
			}
			ig.game.screen.y = 0;
			$("#user_name").val("");
			 $("#user_name").show();
		},
			update: function() {
				this.parent(); 
				if( ig.input.state('click')) 
				{
					$("#user_name").blur();
			    }
				ig.game.screen.y = 0;
				ig.game.sortEntities();
			},
			draw:function(){
				this.parent(); 
				this.imgBackground.draw(0,0);
				this.height_title_font.draw('FINAL HEIGHT:',ig.game.screen.x+this.size.x/2,ig.game.screen.y+110,'center');
				this.font.draw(ig.game.SCORE.formatScore(0,",",'.'),ig.game.screen.x+this.size.x/2,ig.game.screen.y+180,"center");
				//this.personal_font.draw('PERSONAL BEST',ig.game.screen.x+this.size.x/2,340,'center');
				this.answer_title_font.draw('Correct Answers:',ig.game.screen.x+this.size.x/2,390,'center');
				this.font.draw(ig.game.correctAnswer+"/"+ig.game.totalQuestion,ig.game.screen.x+this.size.x/2,440,'center');
				this.progress_title_font.draw('ENTER YOUR FULL NAME',ig.game.screen.x+this.size.x/2,650,'center','#707070');
				//this.imgProgress_wrapper.draw(90,800);
				canvas_pos = $("#canvas").position();
				$("#user_name").css("left",canvas_pos.left+(90*ratio));				
				$("#user_name").css("top",canvas_pos.top+(710*ratio));
				$("#user_name").css("width",(453*ratio));
				$("#user_name").css("height",(74*ratio));
				
				/*var success_count = 0;
					for ( i = 0 ; i < APP_DATA.QUESTION_LIST.length ; i++)
					{
					    if(APP_DATA.QUESTION_LIST[i].status == "success"){
						    success_count++;
					    }
					}
				 var percent = (success_count/APP_DATA.QUESTION_LIST.length)*100;
				 if (percent > 0){
						this.imgProgress.draw(96,806,0,0,this.imgProgress.width*percent/100,68);
				 }
				 */
			},
			kill:function(){
			 this.parent();
			 if(this.againBtn){
			 	this.againBtn.kill();
			 }
			 this.submitBtn.kill();
			 this.mainBtn.kill();
			 $("#user_name").hide();
			 $("#user_name").blur();
			 $("#canvas").focus();
			}
		 
	});
});
	