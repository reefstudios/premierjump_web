ig.module('game.player')
.requires(
	'impact.entity',
	'game.question',
	'game.tam_text'
)
.defines(function () {
	Player = ig.Entity.extend({
        size: {x: 121,y: 180},
    	maxVel:{x:600,y:0},	
        friction: {x: 600,y: 0},
        vy : 0,
        high_jump:false,
        jump_count:0,
        BEST_HEIGHT:Configs.SCREEN_HEIGHT,
        BASE_HEIGHT:Configs.SCREEN_HEIGHT,
        question:null,
        tam_text : null,
        vNextIndex:null,
        bucket_hit_flag:false,
        secTimer:new ig.Timer(1),
        hit_delay_time:3,
        GRAVITY:0.5,
        JUMP_HEIGHT:-19.5,	
        HIGH_JUMP_HEIGHT:-30,
        animSheet: new ig.AnimationSheet(Configs.img_Player, 121, 180),
        flip: false,
       // sfxFire: new ig.Sound('media/sounds/fire.*', true),
		zIndex:5,
        init: function (x, y, settings) {
            this.parent(x-this.size.x/2, y-this.size.y, settings);
            this.addAnim('fall', 1, [0]);
            this.addAnim('left', 1, [1]);
            this.addAnim('right', 1, [2]);
            this.addAnim('tam_jump', 0.08, [7,3],true);
            this.addAnim('jump', 0.08, [7,3],true);
            this.addAnim('rocket_boost', 1, [4]);
            this.addAnim('bucket_hit', 0.2, [5,6]);
            this.currentAnim = this.anims.fall;
            this.assist_list =[];
            
            if(APP_DATA.GAME_SETTINGS.tam_assist == 1){
	    		this.tam_text = ig.game.spawnEntity(TAM_Text,Configs.SCREEN_WIDTH/2-300,ig.game.screen.y+Configs.SCREEN_HEIGHT,{init_flag:true});
	    		this.assist_list.push(Configs.img_tam_text);
            }
            if(APP_DATA.GAME_SETTINGS.seller_assist == 1){
            	this.assist_list.push(Configs.img_seller_text);
	    		this.tam_text = ig.game.spawnEntity(TAM_Text,Configs.SCREEN_WIDTH/2-300,ig.game.screen.y+Configs.SCREEN_HEIGHT,{
	    			init_flag:true,
	    			animSheet: new ig.AnimationSheet(Configs.img_seller_text, 600, 994),
	    		});
        	}
            if(APP_DATA.GAME_SETTINGS.ats_assist == 1){
            	this.assist_list.push(Configs.img_ats_text);
	    		this.tam_text = ig.game.spawnEntity(TAM_Text,Configs.SCREEN_WIDTH/2-300,ig.game.screen.y+Configs.SCREEN_HEIGHT,{
	    			init_flag:true,
	    			animSheet: new ig.AnimationSheet(Configs.img_ats_text, 600, 994),
	    		});
        	}
            if(APP_DATA.GAME_SETTINGS.ssp_assist == 1){
            	this.assist_list.push(Configs.img_ssp_text);
	    		this.tam_text = ig.game.spawnEntity(TAM_Text,Configs.SCREEN_WIDTH/2-300,ig.game.screen.y+Configs.SCREEN_HEIGHT,{
	    			init_flag:true,
	    			animSheet: new ig.AnimationSheet(Configs.img_ssp_text, 600, 994),
	    		});
        	}
        },
		draw:function(){
				this.parent();
			},
        update: function () {
        	if(this.question || ig.game.game.pause_state) return;
            this.parent();
			    this.pos.y += this.vy;

       		  if(this.BEST_HEIGHT > this.pos.y)
			  {
				  ig.game.SCORE = Math.abs(parseInt(this.pos.y-Configs.SCREEN_HEIGHT));
				  this.BEST_HEIGHT = this.pos.y;
			  }
			   if(this.pos.y < Configs.SCREEN_HEIGHT / 2){
           		   ig.game.screen.y +=this.vy;
           		   if(ig.game.game){
           		   	   ig.game.game.pause_btn.pos.y =ig.game.screen.y+10;
	           		   if(ig.game.game.background){
		           		  ig.game.game.background.pos.y +=this.vy*0.95;
	           		   }
	           		   if(ig.game.game.temp_background){
	           	   		  ig.game.game.temp_background.pos.y +=this.vy*0.95;
	           		   }
	           		   if(ig.game.game.sun){
		           		  ig.game.game.sun.pos.y +=this.vy*0.85;
	           		   }
	           		   for ( i = 0 ; i < ig.game.game.cloud_list.length ; i ++){
	           	   		   ig.game.game.cloud_list[i].pos.y +=this.vy*0.85;
	           		   }
	           		   ig.game.game.cloud_pos_y +=this.vy*0.85;
           		   }
			   }

			if(this.bucket_hit_flag && this.secTimer.delta() >0){ // when timer has ticked for  a second
		        this.hit_delay_time--; // update the global game second counter 
		        this.secTimer.reset() // res
		    }
		    if(this.hit_delay_time < 1){
		    	this.hit_delay_time = 3
		    	this.bucket_hit_flag = false;
		    }
            if(this.pos.y > this.BASE_HEIGHT+200){
            	if(ig.game.game.savelives.length > 0)
            	{
            		this.LiveBoost();
            		ig.game.game.savelives[ig.game.game.savelives.length-1].removeflag = true;
            		
            	}else{
	            	ig.game.onGameOver();
            	}
            }
            if(this.vy > 0 && this.high_jump){
            	this.high_jump = false;
            }
            if (ig.input.state('right')) {
                    this.move_right();
            }else if (ig.input.state('left')) {
                    this.move_left();
            }
			if( ig.input.state('click')) 
			{
				if(ig.input.mouse.x*1/ratio + ig.game.screen.x > Configs.SCREEN_WIDTH/2 ){
                    this.move_right();
				}else{
                    this.move_left();
				}
			}
            if (this.pos.x > Configs.SCREEN_WIDTH){
            	this.pos.x = -this.size.x;
            }else if(this.pos.x < -this.size.x){
            	this.pos.x = Configs.SCREEN_WIDTH;
            }
            if(!this.high_jump && !this.bucket_hit_flag){
	            if(this.vel.x == 0){
	            	if(this.vy > 0){
		            	this.currentAnim = this.anims.fall;
	            	}
	            }else if(this.vel.x > 0){
	            	//this.currentAnim = this.anims.right;
	        	}else if(this.vel.x < 0){
	            	//this.currentAnim = this.anims.left;
	        	}
	    	}
			if (!this.jump_count && this.pos.y+this.size.y>Configs.SCREEN_HEIGHT)
			{
				this.jump();
			}
			for (i = ig.game.blocks.length-1 ; i > -1 ; i --){
				var temp_block = ig.game.blocks[i];
				if(this.vy > 0 && this.pos.x+(this.size.x/3*2) > temp_block.pos.x && this.pos.x+this.size.x/2.3 < temp_block.pos.x+temp_block.size.x && this.pos.y+this.size.y > temp_block.getReal_Pos_y() && this.pos.y+this.size.y < temp_block.getReal_Pos_y()+temp_block.size.y){
					  temp_block.block_state = 0;
					  this.jump_count++;
					  if(temp_block.block_type < 4 || temp_block.block_type == 5){
					  	 if(temp_block.block_type == 1 && temp_block.has_spring){
					  	  	  temp_block.changeTamState();
					  	  	  this.tamJump();
					  	  }else{
 						     this.jump();
					  	  }
						 if(temp_block.block_type == 3 || APP_DATA.DIFFICULTY_LEVEL == 3){
						 	 temp_block.kill();
						 	 ig.game.blocks.splice(i, 1);
					     }		
					  }else if(temp_block.block_type == 6){
					  	  if(APP_DATA.SETTINGS_QUESTIONS_STATE && !this.question){
						  	  this.question = ig.game.spawnEntity(Question,0,ig.game.screen.y);
					  	  }else{
 						     this.jump();
					  	  }
					  	  this.vNextIndex = i;
					  }
				}
	       }
		if(!this.high_jump && ig.game.game && ig.game.game.bucket != null && ig.game.game.bucket && Math.abs(this.pos.x-ig.game.game.bucket.pos.x) < ig.game.game.bucket.size.x-10 && Math.abs(this.pos.y-ig.game.game.bucket.pos.y) < ig.game.game.bucket.size.y){
			//if(this.player.bucket_hit_flag < 1)
				this.bucket_hit();
		}
		if(ig.game.game){
			for (i = 0 ; i < ig.game.game.rains_list.length ; i++){
				var pRain = ig.game.game.rains_list[i];
				if(!this.high_jump && ig.game.game && Math.abs(this.pos.x-pRain.pos.x) < pRain.size.x && Math.abs(this.pos.y-pRain.pos.y) < pRain.size.y){
					//if(this.player.bucket_hit_flag < 1)
						this.bucket_hit();
				}
			} 
		}
		this.vy +=this.GRAVITY;
        },
        jump:function(){
  	  	 sound_play("jump");
    	this.currentAnim = this.anims.jump.rewind();
    	 this.vy = this.JUMP_HEIGHT;
        },
        tamJump:function(){
			  rnd_assits = this.assist_list[Math.floor(Math.random() * this.assist_list.length)];
        	if(APP_DATA.USER_TYPE != 3){
        		//tam_flag = APP_DATA.USER_TYPE;
        	}
        	this.tam_text = ig.game.spawnEntity(TAM_Text,Configs.SCREEN_WIDTH/2-300,ig.game.screen.y+Configs.SCREEN_HEIGHT-500,
		        {animSheet: new ig.AnimationSheet(rnd_assits, 600, 994)}		
        	);
        	/*if(tam_flag == 1){
	        	this.tam_text = ig.game.spawnEntity(TAM_Text,Configs.SCREEN_WIDTH/2-300,ig.game.screen.y+Configs.SCREEN_HEIGHT-500,
			        {animSheet: new ig.AnimationSheet(Configs.img_seller_text, 600, 994)}		
	        	);
        	}else if(tam_flag == 2){
        		this.tam_text = ig.game.spawnEntity(TAM_Text,Configs.SCREEN_WIDTH/2-300,ig.game.screen.y+Configs.SCREEN_HEIGHT-500);
        	}*/
        	
	  	  	sound_play("tam");
        	this.currentAnim = this.anims.tam_jump.rewind();
        	this.high_jump = true;
        	this.vy = this.HIGH_JUMP_HEIGHT;
        },
        RocketBoost:function(){
	  	  	sound_play("rocket_boost");
        	this.currentAnim = this.anims.rocket_boost;
        	this.high_jump = true;
        	this.vy = this.HIGH_JUMP_HEIGHT*2;
        },
		LiveBoost:function(){
	  	  	sound_play("rocket_boost");
        	this.currentAnim = this.anims.rocket_boost;
        	this.high_jump = true;
        	this.vy = this.HIGH_JUMP_HEIGHT;
		},
        move_left:function(){
        	if(this.bucket_hit_flag || this.question || ig.game.game.pause_state) return;
        	if(!this.high_jump){
        	  this.currentAnim = this.anims.left;
        	}
        		this.vel.x =-200;
        },
        move_right:function(){
        	if(this.bucket_hit_flag || this.question || ig.game.game.pause_state) return;
        	if(!this.high_jump){
	        	this.currentAnim = this.anims.right;
        	}
        		this.vel.x =200;
        },
        bucket_hit:function(){
        	if(APP_DATA.GAME_SETTINGS.game_obstacle == 1 && !ig.game.game.bucket.hit_flag){
	        	ig.game.game.bucket.hit_flag = true;
	        	ig.game.game.bucket.currentAnim = ig.game.game.bucket.anims.bubble_anim.rewind();
        	}
        	this.bucket_hit_flag = true;
        	this.currentAnim = this.anims.bucket_hit;
        },
        question_result:function(result){
        	ig.game.game.vNextCount--;
        	if(this.vNextIndex != null){
        		ig.game.blocks[this.vNextIndex].kill();
        		ig.game.blocks.splice(this.vNextIndex, 1);
        	}	
        	this.vNextIndex = null;
        	this.question.kill();
        	if(result){
	        	this.RocketBoost();
        	}else{
			    this.jump();
        	}
        },
        Accelermeter:function(acceleration){
        if(this.bucket_hit_flag) return;
	    	if(!this.high_jump){
			  	  if(acceleration.x > 2){
		        	  this.currentAnim = this.anims.left;
		    	  }else if(acceleration.x < -2){
		        	  this.currentAnim = this.anims.right;
		    	  }else{
		        	  //this.currentAnim = this.anims.fall;
				  }
		    }
    	  this.vel.x = -acceleration.x*60;
        },
        kill:function(){
        	this.parent();
        	if(this.question){
	        	this.question.kill();
        	}
        	if(this.tam_text){
        		this.tam_text.kill();
        	}
        }
    });
});