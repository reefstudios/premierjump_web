ig.module('game.rain').requires('impact.entity').defines(function () {
	Rain = ig.Entity.extend({
        size: {x: 19,y: 38},
        animSheet: new ig.AnimationSheet(Configs.img_rain, 19, 38),
		zIndex:7,
		hit_flag:false,
		maxVel:{x:100,y:600},
        init: function (x, y, settings) {
            this.parent(x-this.size.x/2, y-this.size.y, settings);
            this.addAnim('idle', 1, [0]);
            this.vel.y = 400;
        },
		draw:function(){
				this.parent();
		},
        update: function () {
        	if(ig.game.player.question || ig.game.game.pause_state) return;
            this.parent();
			if (this.pos.y-ig.game.screen.y > Configs.SCREEN_HEIGHT) {
	            for (i in ig.game.game.rains_list) {
	                if (ig.game.game.rains_list[i] == this) {
	                    ig.game.game.rains_list.splice(i, 1);
	                }
	            }
				this.kill();
	        }
        },
    });
});