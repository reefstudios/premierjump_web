ig.module('game.stormy_cloud').requires('impact.entity','game.rain').defines(function () {
	Stormy_Cloud = ig.Entity.extend({
        size: {x: 190,y: 150},
        animSheet: new ig.AnimationSheet(Configs.img_stormy_cloud, 190, 150),
		zIndex:8,
		hit_flag:false,
		secTimer:new ig.Timer(1),
		raining_time : 5,	
		maxVel:{x:100,y:600},	
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.vel.y = 100;
            this.addAnim('idle',1, [0],true);
            this.addAnim('appear', 0.025, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79],true);
            this.addAnim('raining',1,[80]);
            this.addAnim('disappear', 0.025, [80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133],true);
            this.currentAnim = this.anims.idle.rewind();
			this.rain_min_posx = this.pos.x+10;
			this.rain_max_posx = this.rain_min_posx+this.size.x-20;

        },
		draw:function(){
				this.parent();
		},
        update: function () {
        	if(ig.game.player.question || ig.game.game.pause_state){
        	 this.currentAnim.gotoFrame(this.currentAnim.frame);
        	 return;
        	}
            this.parent();
            if(this.currentAnim !=this.anims.idle){
            	this.pos.y = ig.game.screen.y;
            }
            if(this.pos.y-ig.game.screen.y > 0){
            	if(ig.game.game.bucket_alert){
	            	ig.game.game.bucket_alert.kill();
	            	ig.game.game.bucket_alert = null;
	            	this.currentAnim = this.anims.appear.rewind();
            	}
            }
            
			if(this.currentAnim == this.anims.disappear && this.currentAnim.frame == 54)
			{
				this.kill();
				ig.game.game.bucket = null;
				ig.game.game.bucket_delay_time = 0;
				
			}
			if(this.currentAnim == this.anims.appear && this.currentAnim.frame == 79)
			{
				this.currentAnim = this.anims.raining;
			}
			if(this.currentAnim == this.anims.raining){
				if(this.secTimer.delta() >0){ // when timer has ticked for  a second
			        this.raining_time--; // update the global game second counter 
			        this.secTimer.reset() // res
			    }
				if(this.raining_time > 0){
					var prain = ig.game.spawnEntity(Rain,Math.floor(Math.random()*(this.rain_max_posx-this.rain_min_posx+1)+this.rain_min_posx),ig.game.screen.y+this.size.y-50);
					ig.game.game.rains_list.push(prain);
				}else{
					if(ig.game.game.rains_list.length < 1){
						this.currentAnim = this.anims.disappear.rewind();
					}
				}
				
			}
            
        },
    });
});