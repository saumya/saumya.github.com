//
// Ref : 
// Game Assets : 
// 1. http://kenney.nl/assets/animal-pac
// 2. http://www.pixelprospector.com/the-big-list-of-royalty-free-graphics/
// 3. https://www.makeschool.com/gamernews/277/20-best-free-art-resources-for-game-developers
// 4. http://www.gameartguppy.com/
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
	//
	var GameUtil = {
		init : function(){
			console.log('GameUtil:init');
		},
		test : function(){
			console.log('GameUtil.test');
		}
	};
	//
// Ref :
// SpriteSheet : 
// http://www.gameart2d.com/freebies.html
// http://opengameart.org/content/glitch-sprite-assets-huge-collection
	var gameEngine = {
		start : function(){
			console.log('Game Engine : Start');
			var a = $("#gameX");
			var wX = a.width();
			var hX = 400;
			this.game = new Phaser.Game(wX, hX, Phaser.AUTO, 'gameX', { preload: this.preload, create: this.create, update: this.update });
			/*
			this.mainState = {
				preload: function(){
					console.log('mainState : preload');
				},
				create : function(){
					console.log('mainState : create');
					//var btnWrong = this.game.add.button(10, 50, 'buttons',this.onHomeClick,this,28,28);
					this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
				},
				update : function(){
					//console.log('mainState : update');
				},
				shutdown : function(){}
			};
			//
			this.menuState = {
				preload: function(){
					console.log('menuState : preload');
				},
				create : function(){
					console.log('menuState : create');
					//var btnWrong = this.game.add.button(10, 50, 'buttons',this.onHomeClick,this,28,28);
					this.scoreText = this.game.add.text(16, 16, 'Menu', { fontSize: '32px', fill: '#fff' });
				},
				update : function(){
					//console.log('menuState : update');
				},
				shutdown : function(){}
			};
			
			//states
			this.game.state.add('main',this.mainState);
			this.game.state.add('menu',this.menuState);
			this.game.state.start('menu');
			*/
		},
		preload : function(){
			console.log('Phaser : preload : ');
			//this.game.load.image('buttons', 'img/game_ui_buttons.png');
			//this.game.load.spritesheet('buttons', 'img/game_ui_buttons.png',100,100);
			this.game.load.spritesheet('buttons', 'img/game_ui_buttons.png',34.5,34.5);
			//
			this.game.load.atlasXML('animals', 'img/round_outline.png', 'img/round_outline.xml');
			//this.game.load.atlas('animals', 'img/round_outline.png', 'img/round_outline.json');
			//
			//initialise the properties and methods
			//properties
			this.aScore = 0;
			this.aLife = 100;
			this.cX = this.game._width/2;
			this.cY = this.game._height/2;
			//methods
			this.onHomeClick = function(evtObj){
				console.log('onHomeClick : ',evtObj);
				console.log('onHomeClick : this : ',this);

			};
		},
		create : function(){
			console.log('Phaser : create');

			this.game.stage.backgroundColor = '#990000';

			//this.btnHome = this.game.add.sprite(10,10,'buttons',12);
			//this.btnHome.animations.add('btnHomeAnim',[12,13,14,15],1,true,true);
			//
			//var button = this.game.add.button(this.game.world.centerX - 95, 400, 'buttons', null, this, over, out, down,up);
			//this.btnHome = this.game.add.button(10, 10, 'buttons',this.onHomeClick,this,1,3,2,0);
			this.btnHome = this.game.add.button(10, 10, 'buttons',this.onHomeClick,this,29,31,30,28);
			var btnWrong = this.game.add.button(10, 50, 'buttons',this.onHomeClick,this,28,28);
			var btnRight = this.game.add.button(10, 100, 'buttons',this.onHomeClick,this,45,45);
			//
			var spriteHippo = this.game.add.tileSprite(this.cX, 100, 295, 295, 'animals', 'hippo.png');
			//spriteHippo.scale.x = spriteHippo.scale.y = 0.5;
			spriteHippo.anchor.set(0.5);
			spriteHippo.scale.setTo(0.4,0.4);
			//
			this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
			
		},
		update : function(){
			//console.log('update');
			//this.btnHome.animations.play('btnHomeAnim');
			//this.game.debug.renderText(this.btnHome.frame, 32, 32);
		},
		render: function(){
			console.log('rendder');
			//this.game.debug.renderText(this.btnHome.frame, 32, 32);
		},
		end : function(){
			console.log('Game Engine : End');
		}
	};
})();



