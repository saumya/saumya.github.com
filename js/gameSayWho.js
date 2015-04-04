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
			this.game = new Phaser.Game(wX, hX, Phaser.AUTO, 'gameX', { preload: this.preload, create: this.create, update: this.update, render:this.render });
		},
		preload : function(){
			this.game.load.spritesheet('buttons', 'img/game_ui_buttons.png',34.5,34.5);
			this.game.load.atlasXML('animals', 'img/round_outline.png', 'img/round_outline.xml');
			//this.game.load.atlas('animals', 'img/round_outline.png', 'img/round_outline.json');
			//
			//initialise the properties and methods
			//properties
			this.counter = 50;
			this.tCounter = null;
			this.aScore = 0;
			this.aLife = 100;
			this.cX = this.game._width/2;
			this.cY = this.game._height/2;
			this.questions = ['elephant','giraffe','hippo','monkey','panda','parrot','penguin','pig','rabbit','snake'];
			this.correctAnswer = 0;
			//event Handlers
			this.onPlayClick = function(evtObj){
				console.log('onPlayClick : ',evtObj);
				console.log('onPlayClick : this : ',this);
				this.btnPlay.visible = false;
				this.renderQuestion();
			};
			this.updateCounter = function(){
				this.counter--;
				this.tCounter.setText(this.counter);
				if(this.counter<=0){
					//this.game.paused = true;
				}	
			};
			this.renderQuestion = function(){
				this.correctAnswer = Math.floor(Math.random()*10);
				console.log('correctAnswer:',this.correctAnswer);
				console.log('correctAnswer:',this.questions[this.correctAnswer]);
				var posX = this.game.world.centerX ;
				var posY = this.game.world.centerY-70 ;

				switch(this.correctAnswer){
					case 0:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 376, 310, 'animals', 'elephant.png');
					break;
					case 1:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 334, 350, 'animals', 'giraffe.png');
					break;
					case 2:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 294, 293, 'animals', 'hippo.png');
					break;
					case 3:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 336, 285, 'animals', 'monkey.png');
					break;
					case 4:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 332, 285, 'animals', 'panda.png');
					break;
					case 5:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 284, 285, 'animals', 'parrot.png');
					break;
					case 6 :
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 284, 285, 'animals', 'penguin.png');
					break;
					case 7:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 316, 285, 'animals', 'pig.png');
					break;
					case 8:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 284, 370, 'animals', 'rabbit.png');
					break;
					case 9:
						this.spriteQuestion = this.game.add.tileSprite(posX, posY, 284, 321, 'animals', 'snake.png');
					break;
					default:
						console.error('DEFAULT : CASE : Not Handled!');
					break;
				}

				this.spriteQuestion.anchor.set(0.5,0.5);
				this.spriteQuestion.scale.set(0.6,0.6);
				this.game.time.events.add(Phaser.Timer.SECOND * 4, this.fadePicture, this);
			};
			this.fadePicture = function(){
				var t = this.game.add.tween(this.spriteQuestion).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
				t.onComplete.add(this.onFadeComplete, this);
			};
			this.onFadeComplete = function(){
				this.renderQuestion();
			};
		},
		create : function(){
			this.game.stage.backgroundColor = '#990000';
			//
			this.btnPlay = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'buttons',this.onPlayClick,this,1,3,2,0);
			this.btnPlay.anchor.set(0.5,0.5);
			/*
			//questions
			this.spriteQuestion = this.game.add.tileSprite(this.game.world.centerX, this.game.world.centerY-70, 376, 310, 'animals', 'elephant.png');
			this.spriteQuestion.anchor.set(0.5,0.5);
			this.spriteQuestion.scale.set(0.6,0.6);
			*/
			/*
			this.spriteElephant = this.game.add.tileSprite(0, 50, 376, 310, 'animals', 'elephant.png');
			this.spriteGiraffe = this.game.add.tileSprite(376, 50, 334, 350, 'animals', 'giraffe.png');
			this.spriteHippo = this.game.add.tileSprite(710, 50, 294, 293, 'animals', 'hippo.png');
			this.spriteMonkey = this.game.add.tileSprite(1004, 50, 336, 285, 'animals', 'monkey.png');
			this.spritePanda = this.game.add.tileSprite(1340, 50, 332, 285, 'animals', 'panda.png');
			this.spriteParrot = this.game.add.tileSprite(1672, 50, 284, 285, 'animals', 'parrot.png');
			this.spritePenguin = this.game.add.tileSprite(1956, 50, 284, 285, 'animals', 'penguin.png');
			this.spritePig = this.game.add.tileSprite(2240, 50, 316, 285, 'animals', 'pig.png');
			this.spriteRabbit = this.game.add.tileSprite(2525, 50, 284, 370, 'animals', 'rabbit.png');
			this.spriteSnake = this.game.add.tileSprite(2809, 50, 284, 321, 'animals', 'snake.png');
			// group
			this.gAllAnimals = this.game.add.group();
			this.gAllAnimals.add(this.spriteElephant);
			this.gAllAnimals.add(this.spriteGiraffe);
			this.gAllAnimals.add(this.spriteHippo);
			this.gAllAnimals.add(this.spriteMonkey);
			this.gAllAnimals.add(this.spritePanda);
			this.gAllAnimals.add(this.spriteParrot);
			this.gAllAnimals.add(this.spritePenguin);
			this.gAllAnimals.add(this.spritePig);
			this.gAllAnimals.add(this.spriteRabbit);
			this.gAllAnimals.add(this.spriteSnake);
			//
			this.gAllAnimals.scale.set(0.3,0.3);
			this.gAllAnimals.y = this.game._height-150;
			*/
			//  Make them all input enabled
    		//this.gAllAnimals.setAll('inputEnabled', true);
    		//this.gAllAnimals.callAll('input.enableDrag', 'input');
    		//
    		//this.game.add.tween(this.gAllAnimals.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    		//this.game.add.tween(this.gAllAnimals.x).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    		//

    		/*
    		this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    		// Pause the game
    		//this.game.paused = true;
    		
    		//game.input.onDown.add(unpause, self);
    		//menu.destroy();
    		
    		//
    		this.tCounter = this.game.add.text(this.game.world.width-40, 40, this.counter, { font: "32px Arial", fill: "#ffffff", align: "center" });
    		this.tCounter.anchor.setTo(0.5, 0.5);
    		//Timer
    		this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    		//this.game.time.events.add(Phaser.Timer.SECOND * 4, this.hideQuestion, this);
    		*/
		},
		update : function(){
			//console.log('update');
			//this.sprite.animations.play('spriteAnim');
			//this.game.debug.renderText(this.btnHome.frame, 32, 32);
			/*
			this.gAllAnimals.x -= 1;
			//console.log(this.gAllAnimals.x);
			if(this.gAllAnimals.x<-1000){
				this.gAllAnimals.x = this.game._width;
			}
			*/
			//
			//this.scoreText.text = +1;
		},
		render: function(){
			//console.log('rendder');
			//this.game.debug.renderText(this.btnHome.frame, 32, 32);
			//this.game.debug.spriteInfo(this.spriteHippo, 32, 32);

		},
		end : function(){
			console.log('Game Engine : End');
		}
	};
})();



