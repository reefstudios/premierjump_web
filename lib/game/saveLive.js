ig.module('game.saveLive').requires('impact.entity').defines(function () {
	saveLive = ig.Entity.extend({
        size: {x: 23,y: 33},
        animSheet: new ig.AnimationSheet(Configs.img_saveLive, 23, 33),
		zIndex:8,
		opacity :1,
		current_Scale:1,
		removeflag:false,
        init: function (x, y, settings) {
            this.parent(x,y, settings);
            this.addAnim('icon', 1, [0]);
        },
		draw:function(){
			ig.system.context.globalAlpha = this.opacity;
				this.parent();
		    ig.system.context.globalAlpha = 1;
		},
        update: function () {
        	this.parent();
        	this.pos.y = ig.game.screen.y+31;
			if(this.removeflag){
				this.opacity = this.opacity-0.05;
				//this.current_Scale = this.current_Scale-0.02
				//this.setScale(this.current_Scale,this.current_Scale);
			}
			if(this.opacity < 0){
				this.kill();
				ig.game.game.savelives.splice(ig.game.game.savelives.length-1, 1);
			}
        }
    });
});