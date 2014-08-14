ig.module('game.cloud').requires('impact.entity').defines(function () {
	Cloud = ig.Entity.extend({
        size: {x: 200,y: 200},
        animSheet: new ig.AnimationSheet(Configs.img_cloud, 200, 200),
		zIndex:3,
		obj_type:'cloud',
		obj_scale :1,
		angle :Math.random()*20,
		angle_direct:1,
		delta_angle:1+Math.random()*0.5,	
        init: function (x, y, settings) {
            this.parent(Math.random() *(Configs.SCREEN_WIDTH-this.size.x),ig.game.game.cloud_pos_y, settings);
            this.addAnim('cloud', 1, [0]);
            this.addAnim('star', 1, [1]);
            ig.Entity.inject("setScale");
            if(APP_DATA.DIFFICULTY_LEVEL == 3){
	            if(ig.game.screen.y-ig.game.game.background.pos.y > 2500){
	            	this.obj_type = 'star';
	            }else{
	            	this.obj_type = 'cloud';
	            }
            }else{
	            if(ig.game.screen.y-ig.game.game.background.pos.y < 4600){
	            	this.obj_type = 'star';
	            }else{
	            	this.obj_type = 'cloud';
	            }
            }
            	
            if(this.obj_type == 'cloud'){
            	this.obj_scale =0.5+Math.random()*0.4;
				this.currentAnim = this.anims.cloud;
	            this.setScale(this.obj_scale,this.obj_scale/3);
            }else{
	            var dir_list = [1,-1];
			    this.angle_direct = dir_list[Math.floor(Math.random() * dir_list.length)];
            	this.obj_scale =0.2+Math.random()*0.2;
				this.currentAnim = this.anims.star;
	            this.currentAnim.angle = this.angle_direct*this.angle*(Math.PI/180);
	            this.setScale(this.obj_scale,this.obj_scale);
            }
            ig.game.game.cloud_pos_y -=Configs.SCREEN_HEIGHT/ig.game.game.cloud_count;
            this.vel.x =30;

        },
		draw:function(){
				this.parent();
		},
        update: function () {
        	this.parent();
        	if(this.pos.x>Configs.SCREEN_WIDTH){
        		this.pos.x = -this.size.x;
        	}
        	if(this.obj_type =='star'){
        		this.angle +=this.angle_direct*this.delta_angle;
        		this.currentAnim.angle = this.angle*(Math.PI/180);
    		}
        	if(this.pos.y >ig.game.screen.y+Configs.SCREEN_HEIGHT){
           	   for ( i = 0 ; i < ig.game.game.cloud_list.length ; i ++){
           	   	   if (ig.game.game.cloud_list[i] == this) {
	                    ig.game.game.cloud_list.splice(i, 1);
	                }
           	   }
           	   this.kill();
        	}
        }
    });
});