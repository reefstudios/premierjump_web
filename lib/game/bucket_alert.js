ig.module('game.bucket_alert').requires('impact.entity','plugins.scale').defines(function () {
	Bucket_Alert = ig.Entity.extend({
        size: {x: 100,y: 90},
        current_Scale:1,
        delta_scale :0.01,	
        animSheet: new ig.AnimationSheet(Configs.img_bucket_alert, 100, 90),
        flip: false,
		zIndex:10,
        init: function (x, y, settings) {
            this.parent(x-this.size.x/2, y-this.size.y, settings);
            this.addAnim('alert', 1, [0]);
            ig.Entity.inject("setScale");
            this.setScale(this.current_Scale,this.current_Scale);
        },
		draw:function(){
				this.parent();
		},
        update: function () {
        	if(ig.game.player.question || ig.game.game.pause_state) return;
            this.parent();
            this.pos.y = ig.game.screen.y;
			this.current_Scale -=this.delta_scale ;
			if(this.delta_scale > 0 && this.current_Scale < 0.5){
				this.delta_scale *=-1;
			}else if(this.delta_scale < 0 && this.current_Scale > 1){
				this.delta_scale *=-1;
			}
			this.setScale(this.current_Scale,this.current_Scale);
        },
    });
});