ig.module('game.seller_text').requires('impact.entity').defines(function () {
	Seller_Text = ig.Entity.extend({
        size: {x: 600,y: 994},
        animSheet: new ig.AnimationSheet(Configs.img_seller_text, 600, 994),
		zIndex:6,
		vy:-80,
		secTimer:new ig.Timer(1),
		delay_time:0,
		delta_vy :20,
		init_flag:false,
        init: function (x, y, settings) {
            this.parent(x,y, settings);
            this.addAnim('idle', 0.05, [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
        },
		draw:function(){
				this.parent();
		},
        update: function () {
        	if(ig.game.game.pause_state){
				this.currentAnim.gotoFrame(this.currentAnim.frame);
				return;        		
        	}
        	this.parent();
        	/*if(this.vy > 400){
        		this.delta_vy = 0;
				if(this.secTimer.delta() >0){ // when timer has ticked for  a second
			        this.delay_time++; // update the global game second counter 
			        this.secTimer.reset() // res
			    }
			    if(this.delay_time > 1){
			    	this.vy = 400;
			    	this.delta_vy = -20;
			    }
        	}
        	if(this.delta_vy < 0 && this.pos.y > ig.game.screen.y+Configs.SCREEN_HEIGHT){
        		this.kill();
        	}
        	this.vy +=this.delta_vy;*/
        	if(this.currentAnim.frame == 19){
        		this.kill();
        	}
        	if(!this.init_flag)
        		this.pos.y =ig.game.screen.y+Configs.SCREEN_HEIGHT-650;
        },
    });
});