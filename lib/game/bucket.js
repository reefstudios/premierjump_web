ig.module('game.bucket').requires('impact.entity').defines(function () {
	Bucket = ig.Entity.extend({
        size: {x: 100,y: 100},
        animSheet: new ig.AnimationSheet(Configs.img_bucket, 360, 240),
		zIndex:8,
		hit_flag:false,
		maxVel:{x:100,y:600},
        init: function (x, y, settings) {
            this.parent(x-this.size.x/2, y-this.size.y, settings);
            this.addAnim('idle', 1, [0]);
            this.vel.y = 400;
            if(APP_DATA.DIFFICULTY_LEVEL == 1){
	            this.addAnim('bubble_anim', 0.01, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],true);
            }else if(APP_DATA.DIFFICULTY_LEVEL == 2){
	            this.addAnim('bubble_anim', 0.01, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],true);
            }else if(APP_DATA.DIFFICULTY_LEVEL == 3){
	            this.addAnim('bubble_anim', 0.01, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],true);
            }
        },
		draw:function(){
				this.parent();
		},
        update: function () {
        	if(ig.game.player.question || ig.game.game.pause_state) return;
            this.parent();
            if(this.pos.y+240-this.size.y-ig.game.screen.y > 0){
            	if(ig.game.game.bucket_alert){
	            	ig.game.game.bucket_alert.kill();
	            	ig.game.game.bucket_alert = null;
            	}
            }
			if (this.pos.y-ig.game.screen.y > Configs.SCREEN_HEIGHT) {
				this.kill();
				ig.game.game.bucket = null;
				ig.game.game.bucket_delay_time = 0;
	        }
        },
    });
});