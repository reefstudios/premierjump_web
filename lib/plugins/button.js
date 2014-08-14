// A Button Entity for Impact.js
ig.module( 'plugins.button' )
.requires(
  'impact.entity'
)
.defines(function() {

  Button = ig.Entity.extend({
    size: { x: 80, y: 40 },
    
    text:'Button',
    textPos: { x: 5, y: 5 },
    textAlign: 'left',
    
    font: null,
    animSheet: null,
    
    state: 'idle',
    
    _oldPressed: false,
    _startedIn: false,
    _actionName: 'click',
    
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'active', 1, [1] );
      this.addAnim( 'deactive', 1, [2] );
	  if(this.textAlign == 'left'){
	  	  this.textPos.x = 5;
	  	  this.textPos.y = (this.size.y-this.font.size)/2
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
            this.setState( 'active' );
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
    },
    
    draw: function() {
      if ( this.state !== 'hidden' ) {
        this.parent();
        if ( this.font != null ) {
	          this.font.draw( 
	            this.text, 
	            this.pos.x -ig.game.screen.x + this.textPos.x, 
	            this.pos.y - ig.game.screen.y+ this.textPos.y,this.textAlign);
		}
      }
    },
    
    setState: function( s ) {
      this.state = s;
      
      if ( this.state !== 'hidden' ) {
        this.currentAnim = this.anims[ this.state ];
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