//
(function(){
	console.log('Game On !');
	//var aURL = "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js";
	var pahserURL = "js/vendor/phaser.js";
	//var pahserURL = "https://cdnjs.cloudflare.com/ajax/libs/phaser/2.3.0/phaser.min.js";
	$.getScript( pahserURL )
	  .done(function( script, textStatus ) {
	    console.log( 'SUCCESS : Phaser Load',textStatus );
	    $('#idGameOn').remove();
	    gameEngine.start();
	  })
	  .fail(function( jqxhr, settings, exception ) {
	    //$( "div.log" ).text( "Triggered ajaxError handler." );
	    console.log('FAIL : Phaser Load',jqxhr);
        console.log('settings',settings);
        console.log('exception',exception);
        $('#idGameOn').text('ERROR : Loading Enigne. Please, Try Again.');
	});
// Ref :
// SpriteSheet : 
// http://www.gameart2d.com/freebies.html
// http://opengameart.org/content/glitch-sprite-assets-huge-collection
	var gameEngine = {
		game : null,
		frameCounter: 2,
		btnHome : null,
		start : function(){
			console.log('Game Engine : Start');
			var a = $("#gameX");
			var wX = a.width();
			var hX = 400;
			this.game = new Phaser.Game(wX, hX, Phaser.AUTO, 'gameX', { preload: this.preload, create: this.create, update: this.update });
		},
		preload : function(){
			console.log('Phaser : preload');
			//this.game.load.image('buttons', 'img/game_ui_buttons.png');
			//this.game.load.spritesheet('buttons', 'img/game_ui_buttons.png',100,100);
			this.game.load.spritesheet('buttons', 'img/game_ui_buttons.png',34.5,34.5);
		},
		create : function(){
			console.log('Phaser : create');
			var _this = this;
			//this.btnHome = this.game.add.sprite(10,10,'buttons',12);
			//this.btnHome.animations.add('btnHomeAnim',[12,13,14,15],1,true,true);
			//
			//var button = this.game.add.button(this.game.world.centerX - 95, 400, 'buttons', null, this, over, out, down,up);
			this.btnHome = this.game.add.button(10, 10, 'buttons',this.onHomeClick,this,1,3,2,0);
		},
		update : function(){
			//this.btnHome.animations.play('btnHomeAnim');
		},
		end : function(){
			console.log('Game Engine : End');
		},
		onHomeClick: function(){
			console.log('home click');
		}
	};
})();



