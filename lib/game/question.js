ig.module('game.question').requires('impact.entity','impact.font','plugins.font','game.question_button').defines(function () {
		Question = ig.Entity.extend({

			// Set some of the properties
			size:{x:640,y:1138},
			zIndex:10,
			title_font      :new Font( '40px Garamond'),
			text_font       :new Font( '26px Garamond',0,0,{
				multiline : true,
				widthForMultiline:540
			}),
				button_font		:new Font( '26px Garamond',0,0,{
				multiline : true,
				widthForMultiline:445
			}),
			answer_result   :false,
			question_index  :null,
			allAnswered : false,					
			animSheet: new ig.AnimationSheet( Configs.img_question_back, 640, 1138),
			btn_list  :[],
			continue_btn :null,	
			secTimer:new ig.Timer(1),
			milisec:0,
			remaining_time:21,
		    timer_progress   :new ig.Image(Configs.img_question_timer_progress),
		    timer_progress_1 :new ig.Image(Configs.img_question_timer_progress_1),
			init: function( x, y, settings ) {
				// Add animations for the animation sheet
				// Call the parent constructor
			sound_play('question_popup');
			this.parent( x, y, settings );
            this.addAnim('back', 1, [0]);
			ig.game.totalQuestion++;
		    var temp_qIndex_list = [];
		    for ( k = 0 ; k < APP_DATA.QUESTION_LIST.length ; k ++)
		    {
		    	if(APP_DATA.QUESTION_LIST[k].status != "success"){
		    		temp_qIndex_list.push(k);
				}
		    }
		    if(temp_qIndex_list.length < 1)
		    {
		    	this.allAnswered = true;
			    for ( k = 0 ; k < APP_DATA.QUESTION_LIST.length ; k ++)
			    {
		    		temp_qIndex_list.push(k);
			    }
		    }
		    this.question_index = temp_qIndex_list[Math.floor(Math.random() * temp_qIndex_list.length)];
		    
			ig.game.LockQuestionCount = temp_qIndex_list.length-1;
			//this.question_index = 15;
			var choice_list = [];
			var temp_choice_list = [];
			var temp_answer_indexs = [];
			for (k = 0 ; k < APP_DATA.QUESTION_LIST[this.question_index].answers.length ; k ++){
				if(APP_DATA.QUESTION_LIST[this.question_index].answers[k].is_correct && temp_choice_list.length < 1 ){
					temp_choice_list.push(k);
				}else{
					temp_answer_indexs.push(k);
				}
			}
			for ( k = 0 ; k < 3 ; k++){
				index = temp_answer_indexs[Math.floor(Math.random() * temp_answer_indexs.length)];
				for ( j = 0 ; j < temp_answer_indexs.length ; j++){
				    if (index == temp_answer_indexs[j]){
						temp_answer_indexs.splice(j,1);
				    }
				}
				temp_choice_list.push(index);
			}
			for ( k = 0 ; k < 4 ; k ++)
			{
				index = temp_choice_list[Math.floor(Math.random() * temp_choice_list.length)];
				for ( j = 0 ; j < temp_choice_list.length ; j++){
				    if (index == temp_choice_list[j]){
						temp_choice_list.splice(j,1);
				    }
				}
				choice_list.push(APP_DATA.QUESTION_LIST[this.question_index].answers[index]);
				choice_list[k].answer_index = index;
			}
			 for ( k = 0 ; k < choice_list.length ; k ++)
			 {
 				var btn = ig.game.spawnEntity( Question_Button, this.pos.x-ig.game.screen.x+50,this.pos.y+300+160*k, {
					  font: this.button_font,
					  text: choice_list[k].answer,
					  textAlign: "left",
					  zIndex:11,
					  size: { x: 540, y: 130},
					  animSheet: new ig.AnimationSheet( Configs.img_answer_btn, 540, 130),
					  is_correct:choice_list[k].is_correct,
					  answer_index : choice_list[k].answer_index,
					  question_index:this.question_index, 
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					  	  if(this.is_correct){
  	  	  	  				  sound_play('correct_answer');
					  	  	  this.correct_noticed = true;
					  	  	  this.check_draw_noticed = true;
					  	  	  //this.currentAnim = this.anims["correct"];
					  	  	  ig.game.game.addLive();
					  	  }else{
							   sound_play('wrong_answer');
					  	  	   this.currentAnim = this.anims["wrong"];
					  	  	   ig.game.player.question.correct_btn.correct_noticed = true;
					  	  	   ig.game.player.question.correct_btn.arrow_draw_noticed = true;
					  	  	  //ig.game.player.question.correct_btn.currentAnim = this.anims["correct"];
					  	  }
					  	  ig.game.player.question.setAnswerResult(this.is_correct,this.answer_index);
					  }
					});
			 	 if(choice_list[k].is_correct == 1){
			 	 	 this.correct_btn = btn;
			 	 }
			 	 this.btn_list.push(btn);
			 }
		},
			update: function() {
				if(ig.game.game.pause_state){
					if(this.pos.x != 0){
						 return;
					}else{
						 this.pos.x = Configs.SCREEN_WIDTH+20;
						for ( k = 0 ; k < this.btn_list.length ; k ++)
						 {
						 	 this.btn_list[k].pos.x = this.pos.x-ig.game.screen.x+50;
						 }
						 return;
					}
				}else{
					this.pos.x = 0;
					for ( k = 0 ; k < this.btn_list.length ; k ++)
					 {
					 	 this.btn_list[k].pos.x = this.pos.x-ig.game.screen.x+50;
					 }
				}
				this.parent();
				if(this.remaining_time < 1){
					ig.game.player.question_result(this.answer_result);
				}
				if(this.secTimer.delta() >0){ // when timer has ticked for  a second
			        this.remaining_time--; // update the global game second counter 
			        this.secTimer.reset() // res
			        this.milisec = 0;
			    }
			    if(this.remaining_time < 7){
			    	this.timer_progress = this.timer_progress_1;
			    }
			    this.milisec++;
			 ig.game.screen.y = this.pos.y;
			},
			draw:function(){
		        ig.system.context.globalAlpha = 0.75;
				this.parent();
		        ig.system.context.globalAlpha = 1;
		        this.title_font.draw("Question",this.pos.x-ig.game.screen.x+50,this.pos.y-ig.game.screen.y+100,'left');
		        this.text_font.draw(APP_DATA.QUESTION_LIST[this.question_index].text,this.pos.x-ig.game.screen.x+50,this.pos.y-ig.game.screen.y+150,'left');
		        //this.timer_progress.draw(this.pos.x-ig.game.screen.x,this.pos.y-ig.game.screen.y+Configs.SCREEN_HEIGHT-20,0,0,this.timer_progress.width*(20-(this.remaining_time-this.milisec/60))/20,20);
		        x_pos = this.pos.x-ig.game.screen.x+this.timer_progress.width*(20-(this.remaining_time-this.milisec/30))/20
		        this.timer_progress.draw(x_pos,this.pos.y-ig.game.screen.y+Configs.SCREEN_HEIGHT-30,x_pos,0,this.timer_progress.width-x_pos,30);
		        this.text_font.draw("TIME",this.pos.x-ig.game.screen.x+this.size.x-40,this.pos.y-ig.game.screen.y+Configs.SCREEN_HEIGHT-30,'right');
		        
			},
   		 kill:function(){
   		 	 this.parent();
			ig.game.player.question = null;
			if(this.continue_btn)
				this.continue_btn.kill();
			for ( i = 0 ; i < this.btn_list.length ; i ++){
				this.btn_list[i].kill();
			}
			this.btn_list = [];
   		 },
   		 setAnswerResult:function(result,answer_index){
   		 	 var continue_img  = "";
			 send_data = {"option":"insert_status","qid":APP_DATA.QUESTION_LIST[this.question_index].qid};
   		 	 if(result){
   		 	 	 this.answer_result = true;
   		 	 	 continue_img  = Configs.img_question_blast_btn;
				 ig.game.correctAnswer ++;
				 if(!this.allAnswered){
					 APP_DATA.QUESTION_LIST[this.question_index].status = "success";
					 APP_DATA.QUESTION_LIST[this.question_index].answered = APP_DATA.QUESTION_LIST[this.question_index].answers[answer_index].id;
					 send_data.status = 1;
					 send_data.answered = APP_DATA.QUESTION_LIST[this.question_index].answers[answer_index].id;
				}
   		 	 }else{
   		 	 	 this.answer_result = false;
   		 	 	 continue_img  = Configs.img_question_continue_btn;
   		 	 	 if(!this.allAnswered){
					 APP_DATA.QUESTION_LIST[this.question_index].status = "failure";
	 				 send_data.status = 0;
 				 }
   		 	 }
				$.ajax({
					url:API_URL+"/api",
					data:send_data,
					type:"post",
					dataType:"JSON",
					success:function(response){
						//console.log(JSON.stringify(response));
					},
					error:function(error){
						//console.log(JSON.stringify(error));
					}
				});
   		 	 	this.continue_btn = ig.game.spawnEntity( Button, this.pos.x+140,this.pos.y+965, {
					  font: new Font( '20px Garamond' ),
					  text: '',
					  textAlign: "center",
					  zIndex:11,
					  size: { x: 360, y: 90},
					  animSheet: new ig.AnimationSheet( continue_img, 360, 90),
					  pressedDown: function() {
					  },
					  pressed: function() {
					  },
					  pressedUp: function() {
					  	  ig.game.player.question_result(result);
					  }
					});
   		 	 
			for ( i = 0 ; i < this.btn_list.length ; i ++){
				this.btn_list[i].setState("deactive");
			}
   		 }
	});
});
	