ig.module('game.block').requires('impact.entity').defines(function () {
	Block = ig.Entity.extend({
        size: {
            x: 110,
            y: 28
        },
		maxVel:{x:200,y:500},        		
        zIndex : 4,
        block_state : 1,
        current_assist_char:'',
        opacity : 0.7,
        animSheet: new ig.AnimationSheet(Configs.img_block, 110, 160),
        flip: false,
        init: function (settings) {
	        this.parent(Math.random()*(Configs.SCREEN_WIDTH-this.size.x), ig.game.block_pos_y, settings);
	        this.addAnim('type_1', 1, [0]);
	        this.addAnim('type_2', 1, [1]);
	        this.addAnim('type_3', 1, [2]);
	        this.addAnim('type_4', 1, [3]);
	        this.addAnim('type_5', 1, [4]);
	        this.addAnim('type_6', 1, [5]);
	        this.addAnim('white_assist_char_before', 1, [6]);
	        this.addAnim('white_assist_char_after', 1, [7]);
	        this.addAnim('brown_assist_char_before', 1, [8]);
	        this.addAnim('brown_assist_char_after', 1, [9]);
	        this.addAnim('black_assist_char_before', 1, [10]);
	        this.addAnim('black_assist_char_after', 1, [11]);
	        this.addAnim('female_assist_char_before', 1, [12]);
	        this.addAnim('female_assist_char_after', 1, [13]);
	        this.assist_char_list = [];
			if(APP_DATA.GAME_SETTINGS.white_assist_char == 1){
				this.assist_char_list.push("white_assist_char");
			}
			if(APP_DATA.GAME_SETTINGS.brown_assist_char == 1){
				this.assist_char_list.push("brown_assist_char");
			}
			if(APP_DATA.GAME_SETTINGS.black_assist_char == 1){
				this.assist_char_list.push("black_assist_char");
			}
			if(APP_DATA.GAME_SETTINGS.female_assist_char == 1){
				this.assist_char_list.push("female_assist_char");
			}
			if(APP_DATA.DIFFICULTY_LEVEL == 1){
				  if (ig.game.SCORE >= 50000){
				   this.types = [1,1,2,2,3,3,1,5,1,6];
				}else if (ig.game.SCORE >= 20000 && ig.game.SCORE < 50000){
					this.types = [1, 1, 1, 1, 2, 1, 3, 2, 1,5,5,6];
				}else if (ig.game.SCORE >= 10000 && ig.game.SCORE < 20000){
				 	this.types = [1,1,1,1,1,2,1,1,3,1,1,5,6];
				}else if (ig.game.SCORE >= 5000 && ig.game.SCORE < 10000){
					this.types = [1, 1, 1,1,2,1,3,6];
				}else if (ig.game.SCORE >= 1000 && ig.game.SCORE < 5000){
					 this.types = [1, 1, 1,1,2,1,6];
				}else{
					this.types = [1];
				}
			}else if(APP_DATA.DIFFICULTY_LEVEL == 2){
				  if (ig.game.SCORE >= 50000){
				  	   this.types = [1,1,2,2,3,3,4,5,6];
				  }else if (ig.game.SCORE >= 20000 && ig.game.SCORE < 50000){
				  	  this.types = [1, 1, 2, 1, 3, 2,4,1,5,5,6];
				  }else if (ig.game.SCORE >= 10000 && ig.game.SCORE < 20000){
				  	  this.types = [1,1,1,2,1,3,4,6];
				  }else if (ig.game.SCORE >= 5000 && ig.game.SCORE < 10000){
				  	  this.types = [1, 1, 1,1,2,1,3,6];
				  }else if (ig.game.SCORE >= 1000 && ig.game.SCORE < 5000){
				  	  this.types = [1, 1, 1,1,3,1,6];
				  }else{
				  	  this.types = [1];
				  }
			}else if(APP_DATA.DIFFICULTY_LEVEL == 3){
				  if (ig.game.SCORE >= 50000){
				  	   this.types = [1,1,2,2,6,3,4,5,6];
				  }else if (ig.game.SCORE >= 20000 && ig.game.SCORE < 50000){
				  	   this.types = [1, 1, 2, 6, 3, 2,4,1,5,5,6];
				  }else if (ig.game.SCORE >= 10000 && ig.game.SCORE < 20000){
				  	   this.types = [1,1,6,2,1,3,4,6];
				  }else if (ig.game.SCORE >= 5000 && ig.game.SCORE < 10000){
				  	  this.types = [1, 1, 1,6,2,1,3,6];
				  }else if (ig.game.SCORE >= 1000 && ig.game.SCORE < 5000){
				  	   this.types = [1, 1, 6,1,3,1,6];
				  }else{
				  	   this.types = [1,6,1];
				  }
			}
		  this.has_spring_list = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1];
		  this.has_spring = this.has_spring_list[Math.floor(Math.random() * this.has_spring_list.length)];
		  this.block_type = this.types[Math.floor(Math.random() * this.types.length)];

	      this.firstY = this.pos.y;

		//if(ig.game.game.vNextCount > 0 && this.block_type == 6 ){
		//	this.block_type = 1;
		//}
		//if(ig.game.LockQuestionCount < 1 && this.block_type == 6){
		//	this.block_type = 1;
		//}
		//if(!APP_DATA.SETTINGS_QUESTIONS_STATE && this.block_type == 6){
		//	this.block_type = 1;
		//}
		if(ig.game.blocks.length>8 && ig.game.blocks[ig.game.blocks.length-1].block_type == 6 && ig.game.game.vNextCount < 7){
			this.block_type = 6;
		}
		
		
		//this.has_spring =1;
		//this.block_type = 6;
		  this.currentAnim =  this.currentAnim = this.anims["type_"+this.block_type];
		  if(this.block_type == 1 && this.has_spring){
		  	  this.pos.y -=Configs.block_tam_assit_height.before;
		  	  this.current_assist_char = this.assist_char_list[Math.floor(Math.random() * this.assist_char_list.length)];
			  this.currentAnim = this.anims[this.current_assist_char+"_before"];
		  }else if(this.block_type == 2){
		  	  this.vel.x = (40+Math.random()*10)*APP_DATA.DIFFICULTY_LEVEL;
		  }else if(this.block_type == 5){
		  	  this.vel.y = (40+Math.random()*10)*APP_DATA.DIFFICULTY_LEVEL;
		  }else if(this.block_type == 6){
		  	  this.pos.y -=Configs.vnext_height;
			  ig.game.game.vNextCount++;
		  }
	      ig.game.block_pos_y -=Configs.SCREEN_HEIGHT/ig.game.block_count;
        },
		draw:function(){
			  if(this.block_type == 4){
		        ig.system.context.globalAlpha = this.opacity;
				this.parent();
		        ig.system.context.globalAlpha = 1;
			  }else{
				this.parent();
			  }
		},
        update: function () {
        	if(ig.game.player.question || ig.game.game.pause_state) return;
	           this.parent();
			if (this.pos.y-ig.game.screen.y > Configs.SCREEN_HEIGHT) {
	            for (i in ig.game.blocks) {
	                if (ig.game.blocks[i] == this) {
	                    ig.game.blocks.splice(i, 1);
	                }
	            }
	            ig.game.player.BASE_HEIGHT = this.pos.y;
	            if(this.block_type == 6){
		            ig.game.game.vNextCount--;
	            }
				this.kill();
	        }
	          
			if(this.block_type == 2){
				if(this.pos.x+this.size.x > Configs.SCREEN_WIDTH || this.pos.x < 0){
					this.vel.x =this.vel.x * -1;
				}
	    	}else if(this.block_type == 4 && this.block_state == 0){
	    		this.opacity -=0.1;
	    		if(this.opacity < 0.1){
		            for (i in ig.game.blocks) {
		                if (ig.game.blocks[i] == this) {
		                    ig.game.blocks.splice(i, 1);
		                }
		            }
	    			this.kill();
	    		}
	    	}else if(this.block_type == 5){
				if (Math.abs(this.firstY-this.pos.y) > 120)
				{
					this.vel.y = this.vel.y * -1;
				}
	    	}
    	},
        changeTamState:function(){
	  	    this.pos.y =this.firstY - Configs.block_tam_assit_height.after;
        	this.currentAnim = this.anims[this.current_assist_char+"_after"];
        },
        getReal_Pos_y: function(){
        	if(this.block_type == 1 && this.has_spring){
        		return this.pos.y + Configs.block_tam_assit_height.before;
        	}else if(this.block_type == 6){
        		return this.pos.y + Configs.vnext_height;
        	}else{
        		return this.pos.y;
        	}
        }
    });
});