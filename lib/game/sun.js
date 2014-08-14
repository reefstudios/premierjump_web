ig.module('game.sun').requires('impact.entity').defines(function () {
	Sun = ig.Entity.extend({
        size: {x: 200,y: 200},
        animSheet: new ig.AnimationSheet(Configs.img_sun, 200, 200),
		zIndex:3,
		angle :10,
        init: function (x, y, settings) {
            this.parent(x,y, settings);
            this.addAnim('sun', 1, [0]);
        },
		draw:function(){
				this.parent();
		},
        update: function () {
        	this.parent();
        		this.angle +=0.3;
        		this.currentAnim.angle = this.angle*(Math.PI/180);
        	if(this.pos.y >ig.game.screen.y+Configs.SCREEN_HEIGHT){
           	   this.kill();
           	   ig.game.game.sun = null;
        	}
        }
    });
});