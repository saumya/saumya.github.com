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
			this.MAX_LIFE = 50;
			this.counter = this.MAX_LIFE;
			this.isUserAnswered = false;
			this.isUserWon = false;
			this.tCounter = null;
			this.aScore = 0;
			this.scoreText = null;
			this.aLife = 100;
			this.cX = this.game._width/2;
			this.cY = this.game._height/2;
			this.questions = ['elephant','giraffe','hippo','monkey','panda','parrot','penguin','pig','rabbit','snake'];
			this.correctAnswer = 0;
			this.gAllAnimals = null;//Group containing the option animal
			//event Handlers
			this.showGameInfo = function(shouldShow){
				this.scoreText.visible = shouldShow;
				this.tCounter.visible = shouldShow;
			};
			this.onPlayClick = function(evtObj){
				console.log('onPlayClick : ',evtObj);
				console.log('onPlayClick : this : ',this);
				this.btnPlay.visible = false;
				this.resultText.visible = false;
				// Reset Counter
				this.counter = this.MAX_LIFE;
				this.tCounter.setText(this.counter);
				//
				this.renderQuestion();
				this.showGameInfo(true);
			};
			this.updateCounter = function(){
				this.counter --;
				this.tCounter.setText(this.counter);
				if(this.counter<=0){
					this.optionTimer.stop();
					this.optionTimer.destroy();
					//TODO: provide wrong feedback
					this.aScore -= 1;
					this.scoreText.setText('score: '+(this.aScore));
					this.gAllAnimals.visible = false;
					//
					this.resultText.setText('Time Up !');
					this.resultText.visible = true;
					//
					this.btnPlay.visible = true;
				}else{
					if(this.isUserAnswered===true){
						if(this.isUserWon===true){
							this.aScore += 1;
							this.resultText.setText('Correct');
						}else{
							this.aScore -= 1;
							this.resultText.setText('Wrong');
						}
						this.optionTimer.stop();
						this.optionTimer.destroy();
						//
						this.scoreText.setText('score: '+(this.aScore));
						this.gAllAnimals.visible = false;
						//reset counter
						this.counter = this.MAX_LIFE;
						this.tCounter.setText(this.counter);
						//
						this.isUserAnswered = false;
						//
						this.resultText.visible = true;
						this.btnPlay.visible = true;
					}
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
				this.game.add.tween(this.spriteQuestion).from( { alpha: 1 });
				var t = this.game.add.tween(this.spriteQuestion).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
				t.onComplete.add(this.onFadeComplete, this);
			};
			this.onFadeComplete = function(){
				this.spriteQuestion.destroy();
				this.displayOptions();
			};
			this.displayOptions = function(){
				this.gAllAnimals.visible = true;
				this.gAllAnimals.x = this.game._width;
				//
				this.optionTimer = this.game.time.create(false);
    			this.optionTimer.loop(1000,this.updateCounter,this);
				this.optionTimer.start();
			};
			this.onSpriteSelect = function(eventTarget){
				console.log('onSpriteSelect:Value:',eventTarget.value);
				this.isUserAnswered = true;
				var userValue = eventTarget.value;
				if (userValue===this.correctAnswer) {
					this.isUserWon = true;
				}else{
					this.isUserWon = false;
				}
			};
			this.enableEventHandler = function(spriteRef){
				spriteRef.inputEnabled = true;
				spriteRef.input.priorityID = 1;
				spriteRef.input.useHandCursor = true;
				spriteRef.events.onInputDown.add(this.onSpriteSelect, this); 
			};
		},
		create : function(){
			this.game.stage.backgroundColor = '#990000';
			//
			this.btnPlay = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'buttons',this.onPlayClick,this,1,3,2,0);
			this.btnPlay.anchor.set(0.5,0.5);
			//
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
			// Enable Event Handler
			this.spriteElephant.value = 0;
			this.spriteGiraffe.value = 1;
			this.spriteHippo.value = 2;
			this.spriteMonkey.value = 3;
			this.spritePanda.value = 4;
			this.spriteParrot.value = 5;
			this.spritePenguin.value = 6;
			this.spritePig.value = 7;
			this.spriteRabbit.value = 8;
			this.spriteSnake.value = 9;
			this.enableEventHandler(this.spriteElephant);
			this.enableEventHandler(this.spriteGiraffe);
			this.enableEventHandler(this.spriteHippo);
			this.enableEventHandler(this.spriteMonkey);
			this.enableEventHandler(this.spritePanda);
			this.enableEventHandler(this.spriteParrot);
			this.enableEventHandler(this.spritePenguin);
			this.enableEventHandler(this.spritePig);
			this.enableEventHandler(this.spriteRabbit);
			this.enableEventHandler(this.spriteSnake);
			/*
			this.spriteElephant.inputEnabled = true;
			this.spriteElephant.input.priorityID = 1;
			this.spriteElephant.input.useHandCursor = true;
			this.spriteElephant.events.onInputDown.add(this.onSElephant, this);
			*/ 
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
			this.gAllAnimals.scale.set(0.5,0.5);
			this.gAllAnimals.x = this.game.world.width;
			//this.gAllAnimals.y = this.game._height-150;
			this.gAllAnimals.y = this.game.world.centerY-100;
			this.gAllAnimals.visible = false;
			
			//  Make them all input enabled
    		//this.gAllAnimals.setAll('inputEnabled', true);
    		//this.gAllAnimals.callAll('input.enableDrag', 'input');
    		//
    		//this.game.add.tween(this.gAllAnimals.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    		//this.game.add.tween(this.gAllAnimals.x).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    		//

    		
    		this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    		this.scoreText.visible = false;
    		// Pause the game
    		//this.game.paused = true;
    		
    		//game.input.onDown.add(unpause, self);
    		//menu.destroy();
    		
    		//
    		this.tCounter = this.game.add.text(this.game.world.width-40, 40, this.counter, { font: "32px Arial", fill: "#ffffff", align: "center" });
    		this.tCounter.anchor.setTo(0.5, 0.5);
    		this.tCounter.visible = false;
    		//Timer
    		//this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    		//this.game.time.events.add(Phaser.Timer.SECOND * 4, this.hideQuestion, this);
    		this.resultText = this.game.add.text(this.game.world.width/2, this.game.world.height/2 - 60, 'Correct', { fontSize: '48px', fill: '#fff' });
    		this.resultText.anchor.setTo(0.5, 0.5);
    		this.resultText.visible = false;
		},
		update : function(){
			//console.log('update');
			//this.sprite.animations.play('spriteAnim');
			//this.game.debug.renderText(this.btnHome.frame, 32, 32);
			
			
			//console.log(this.gAllAnimals.x);
			if(this.gAllAnimals.visible===true){
				this.gAllAnimals.x -= 1;
				if(this.gAllAnimals.x<-1500){
					this.gAllAnimals.x = this.game._width;
				}
			}
			
			
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



