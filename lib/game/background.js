ig.module('game.background').requires('impact.entity').defines(function () {
	Background = ig.Entity.extend({
        size: {x: 320,y: 3903},
        animSheet: new ig.AnimationSheet(Configs.img_background, 640, 7805),
		zIndex:1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            if(APP_DATA.DIFFICULTY_LEVEL == 3){
	            this.currentAnim.flip.y = 1;
            }
        },
		draw:function(){
				this.parent();
		},
        update: function () {
        },
    });
});