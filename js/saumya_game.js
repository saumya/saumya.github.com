//
(function(){
	console.log('Game On !');
	//var aURL = "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js";
	var pahserURL = "https://cdnjs.cloudflare.com/ajax/libs/phaser/2.3.0/phaser.min.js";
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
	var gameEngine = {
		start : function(){
			console.log('Game Engine : Start');
			var a = $("#gameX");
			var wX = a.width();
			var hX = 400;
			var game = new Phaser.Game(wX, hX, Phaser.AUTO, 'gameX', { preload: this.preload, create: this.create, update: this.update });
		},
		preload : function(){
			console.log('Phaser : preload');
		},
		create : function(){
			console.log('Phaser : create');
		},
		update : function(){
			console.log('Phaser : update');
		},
		end : function(){
			console.log('Game Engine : End');
		}
	};
})();



