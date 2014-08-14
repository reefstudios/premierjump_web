// A Button Entity for Impact.js

ig.module( 'game.question_button' )
.requires(
  'impact.entity'
)
.defines(function() {

  Question_Button = ig.Entity.extend({
    size: { x: 80, y: 40 },
    
    text:'Button',
    textPos: { x: 5, y: 5 },
    textAlign: 'left',
    
    font: null,
    animSheet: null,
    state: 'idle',
    is_correct : 0,
    answer_index:0,
    question_index:null,
    img_correct_back:new ig.Image(Configs.img_correct_answer_back),
    img_arrow:new ig.Image(Configs.img_question_arrow),
    img_check:new ig.Image(Configs.img_answer_check),
    _oldPressed: false,
    _startedIn: false,
    _actionName: 'click',
    correct_noticed:false,
    arrow_draw_noticed:false,
    check_draw_noticed:false,
    opacity:1,
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'correct', 1, [1] );
      this.addAnim( 'wrong', 1, [2] );
	  lines = 2;
      if(this.font.getWidth(this.text) > this.font.widthForMultiline){
	      lines += parseInt(this.font.getWidth(this.text)/this.font.widthForMultiline);
      }else{
      }
    
	  if(this.textAlign == 'left'){
	  	  this.textPos.x = 5;
    	  this.textPos.y = (this.size.y-this.font.size)/lines;
	  }else if(this.textAlign == 'right'){
	  	  this.textPos.x = this.size.x-5;
  	  	  this.textPos.y = (this.size.y-this.font.size)/2;
	  }else if(this.textAlign == 'center'){
	  	  this.textPos.x = this.size.x/2;
	  	  this.textPos.y = (this.size.y-this.font.size)/2;
	  }
  	  
	      //if ( this.text.length > 0 && this.font === null ) {
	        //if ( ig.game.buttonFont !== null ) this.font = ig.game.buttonFont;
	        //else console.error( 'If you want to display text, you should provide a font for the button.' );
		  //}
    },
    
    update: function() {
      if(ig.game.game.pause_state) return;
      this.parent();
      if ( this.state !== 'hidden' ) {
        var _clicked = ig.input.state( this._actionName );
        
        if ( !this._oldPressed && _clicked && this._inButton() ) {
          this._startedIn = true;
        }
        if ( this._startedIn && this.state !== 'deactive' && this._inButton() ) {
          if ( _clicked && !this._oldPressed ) { // down
            this.setState( 'active' );
            this.pressedDown();
          }
          else if ( _clicked ) { // pressed
            this.setState( 'correct' );
            this.pressed();
          }
          else if ( this._oldPressed ) { // up
            this.setState( 'idle' );
            this.pressedUp();
          }
        }
        else if ( this.state === 'active' ) {
          this.setState( 'idle' );
        }

        if ( this._oldPressed && !_clicked ) {
          this._startedIn = false;
        }

        this._oldPressed = _clicked;
      }
	     if(this.correct_noticed){
		      this.opacity -=0.005;
		      if(this.opacity < 0){
		      	  this.opacity = 0;
		      }
	 	 }  
    },
    
    draw: function() {
      if ( this.state !== 'hidden' ) {
        this.parent();
        if(this.correct_noticed){
	        ig.system.context.globalAlpha = this.opacity;
	        this.img_correct_back.draw(this.pos.x - ig.game.screen.x+2,this.pos.y - ig.game.screen.y+2);
	        ig.system.context.globalAlpha = 1;
	        if(this.check_draw_noticed){
		        this.img_check.draw(this.pos.x - ig.game.screen.x+this.size.x-75,this.pos.y - ig.game.screen.y+(this.size.y-this.img_check.height)/2);
	        }
	        if(this.arrow_draw_noticed){
		        ig.system.context.globalAlpha = 1-this.opacity;
	            this.img_arrow.draw(this.pos.x - ig.game.screen.x+this.size.x,this.pos.y - ig.game.screen.y+(this.size.y-this.img_arrow.height)/2);
		        ig.system.context.globalAlpha = 1;
	        }
        }
        if ( this.font != null ) {
	          this.font.draw( 
	            this.text, 
	            this.pos.x - ig.game.screen.x + this.textPos.x, 
	            this.pos.y - ig.game.screen.y+ this.textPos.y,this.textAlign);
		}
      }
    },
    
    setState: function( s ) {
      this.state = s;
      if ( this.state !== 'hidden' ) {
        //this.currentAnim = this.anims[ this.state ];
      }
    },
    pressedDown: function() {},
    pressed: function() {},
    pressedUp: function() {},
    _inButton: function() {
      return ig.input.mouse.x*1/ratio + ig.game.screen.x > this.pos.x && 
             ig.input.mouse.x*1/ratio + ig.game.screen.x < this.pos.x + this.size.x &&
             ig.input.mouse.y*1/ratio + ig.game.screen.y > this.pos.y && 
             ig.input.mouse.y*1/ratio + ig.game.screen.y < this.pos.y + this.size.y;
    }
  });

});