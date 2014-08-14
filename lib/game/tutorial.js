ig.module('game.tutorial').requires('impact.entity','plugins.font').defines(function () {
	Tutorial = ig.Entity.extend({
        size: {x: 552,y: 950},
        title_font:new Font( '40px Garamond' ),
        title_font_hard:new Font( '35px Garamond' ),
        text_font:new Font( '26px Garamond',0,0,{
			multiline : true,
			widthForMultiline:472
		}),	
		    text_font_1:new Font( '26px Garamond',0,0,{
			multiline : true,
			widthForMultiline:370
		}),
		back_img:null,
		obstacle_img:null,
		obstacle_text:'',
        //animSheet: new ig.AnimationSheet(APP_DATA.DIFFICULTY_LEVEL != 3 ? Configs.img_tutorial : Configs.img_hard_tutorial, 552, 950),
		zIndex:10,
		got_btn :null,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            //this.addAnim('idle', 1, [0]);
            this.back_img = new ig.Image(APP_DATA.DIFFICULTY_LEVEL == 3 ? Configs.img_hard_tutorial : Configs.img_tutorial);
				this.text_font_1.draw('',this.pos.x+150,this.pos.y+620,'left');
            
			if(APP_DATA.GAME_SETTINGS.game_obstacle == 1)
			{
				this.obstacle_text = 'Look out for falling buckets of hours.';
				this.obstacle_img = new ig.Image(Configs.img_tutorial_bucket);
			}else if(APP_DATA.GAME_SETTINGS.game_obstacle == 2){
				this.obstacle_img = new ig.Image(Configs.img_tutorial_stormy_cloud);
				this.obstacle_text = 'Look out for forming rain clouds.';
			}
            	
			this.got_btn = ig.game.spawnEntity( Button, 235,900, {
			  font: new Font( '75px Garamond' ),
			  text: '',
			  textAlign: "center",
			  zIndex:11,
			  size: { x: 190, y: 80},
			  animSheet: new ig.AnimationSheet( Configs.img_got_btn, 190, 80),
			  pressedDown: function() {
			  },
			  pressed: function() {
			  },
			  pressedUp: function() {
			  	  ig.game.game.close_tutorial();
			  }
			});
        },
		draw:function(){
			this.parent();
			this.back_img.draw(this.pos.x,this.pos.y);
			this.obstacle_img.draw(this.pos.x+62,this.pos.y+616);
			this.title_font.draw('HOW TO PLAY',this.pos.x+this.size.x/2,this.pos.y+50,'center');
			if(APP_DATA.DIFFICULTY_LEVEL == 3){
				this.title_font_hard.draw('HARD MODE',this.pos.x+this.size.x/2,this.pos.y+100,'center');
				this.text_font_1.draw('All platforms are one hit.',this.pos.x+150,this.pos.y+290,'left');
				this.text_font_1.draw('Moving platforms are faster.',this.pos.x+150,this.pos.y+455,'left');
				this.text_font_1.draw('Buckets fall more frequently.',this.pos.x+150,this.pos.y+600,'left');
			}else{
				this.text_font.draw('Help your character ascend by jumping off platforms.',this.pos.x+50,this.pos.y+220,'left');
				this.text_font_1.draw('Use the help of your account team members to get a quick boost',this.pos.x+150,this.pos.y+350,'left');
				this.text_font_1.draw('Answer questions to reach greater heights.',this.pos.x+150,this.pos.y+490,'left');
				this.text_font_1.draw(this.obstacle_text,this.pos.x+150,this.pos.y+620,'left');
				
			}
		},
        update: function () {
        },
        kill: function(){
			this.parent();
        	this.got_btn.kill();
        }	
    });
});