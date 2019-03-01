//Creating class to present my player
class Player{
	
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.dx = 10;
		this.dy = 10;
		this.playerWidth = 50;
		this.playerHeight = 37;
		this.isDropOffZone = false;
	}
	
	draw(ctx){
		//console.log("Drawing now");
		let playerImg = document.querySelector("img");
		
		let playerImgPosX = 18, playerImgPosY = 36;
		let playerImgWidth = 14, playerImgHeight = 18;

		ctx.drawImage(playerImg, playerImgPosX, playerImgPosY, playerImgWidth, playerImgHeight, this.x, this.y, this.playerWidth, this.playerHeight);
		//ctx.fillRect(this.x, this.y, this.playerWidth, this.playerHeight);
	}
	
	move(ctx, cure, line){
		
		//Initializing player position
		let x = this.x, y = this.y, playerWidth = this.playerWidth, playerHeight = this.playerHeight;
		let dx = this.dx, dy = this.dy;

		//Initialize this Player object to a variable
		let player = this;
		
		let playerImgRight = document.querySelector("img"), playerImgLeft = document.getElementById("old-hero-left"); //Adding images to be copied to the canvas (coming from the source attr of the img tag in the DOM)
		let playerImgWidth = 0, playerImgHeight = 0;		//These variables represent the size of the image to be copied in pixels from the image in the current directory
		let playerImgPosX = 0, playerImgPosY = 0; 	//Declaring variables for the sprite to be copied and paste on the canvas
				
		window.addEventListener("keydown", function(event){
			
			//Moving player to the right
			if(event.key == "d")
			{	
				//Checking if player has reached the RHS outer bound
				console.log(outerWidth);
				if(x >= outerWidth - 174){
					x = outerWidth - 174;				//Checking if hero has reached the outer RHS bound	
					
				}
				else{
					x += dx;		//Moving right
					
					if(cure.isCuring == true){		
						cure.x += dx;		//Checking if player has the cure, so that he can spread it
					}
					checkCollision(player, cure);
				}

				playerImgWidth = 14, playerImgHeight = 18;		//These variables represent the size of the image to be copied in pixels from the image in the current directory
				playerImgPosX = 18, playerImgPosY = 36; 	//Changing variables for the sprite to be copied and paste on the canvas
				
				//Clearing the screen to redraw the player to face right incase its not facing to the right
				ctx.clearRect(0, 0, outerWidth, outerHeight);
				
				//redraw cure, so that it remains visible until found
				cure.draw(ctx);
				
				//redraw player to face right
				ctx.drawImage(playerImgRight, playerImgPosX, playerImgPosY, playerImgWidth, playerImgHeight, x, y, playerWidth, playerHeight);
				
				//Creating a function that will make a time frame of the player to appear walking
				let interChangingImg = setInterval(function(){
					
					let interChangingImg2 =  setInterval(function(){
						//Changing player picture frame co-ordinates
						playerImgPosX = 18, playerImgPosY = 36;
						
						//Clearing screen to draw another frame of the player to appear as if his in motion
						ctx.clearRect(0, 0, outerWidth, outerHeight);
						
						//redraw cure, so that its always visible
						cure.draw(ctx);
						if(player.isDropOffZone == true && cure.isCuring == true){
							ctx.fillText("Well Done!!!...", 500, 210, 500);
						}	
						ctx.drawImage(playerImgRight, playerImgPosX, playerImgPosY, playerImgWidth, playerImgHeight, x, y, playerWidth, playerHeight);
						
						clearInterval(interChangingImg2);
					}, 100);
					
					if(playerImgPosX == 18){
						//Changing player picture frame co-ordinates
						playerImgPosX = 61, playerImgPosY = 36;
						
						//Clearing the screen to redraw player image inetrchanging as if its moving
						ctx.clearRect(0, 0, outerWidth, outerHeight);
						
						//reDrawing the cure, so that it appears visible until found
						cure.draw(ctx);
						
						ctx.drawImage(playerImgRight, playerImgPosX, playerImgPosY, playerImgWidth, playerImgHeight, x, y, playerWidth, playerHeight);
					}
					
					clearInterval(interChangingImg);
				
				}, 100);
						
				//drawing a line to divide the two towns/cities/villages/locations/whatever/really
				//line.drawCenterLine(ctx);
			}
			
			//moving player to the left
			else if(event.key ==  "a"){
				if(x <= 0){
					x = 0;		//Checking if player hasn't gone beyond the LHS bound
				}
				else{
					x -= dx;
					if(cure.isCuring == true){
						cure.x -= dx;			//Checking if player has been cured, so that he can be able to spread the cure
					}
				}
				
				playerImgPosX = 20, playerImgPosY = 38; 	//Changing the variables for the sprite to be copied and pasted on the canvas (Player facing on the left)
				playerImgWidth = 12, playerImgHeight = 18;		//These variables represent the size of the image to be copied in pixels from the image in the current directory
				
				checkCollision(player, cure);
				//console.log(playerImgPosX + "    " + playerImgPosY);
				
				//Clearing the player facing right to be able to draw a sprite facing left at the same position as the previous one
				ctx.clearRect(0, 0, outerWidth, outerHeight);
				
				//reDraw the cure so that it is visible always
				cure.draw(ctx);
				if(player.isDropOffZone == true && cure.isCuring == true){
					ctx.fillText("Well Done!!!...", 500, 210, 500);
				}	
				//Drawing the the sprite image of the hero to face left
				ctx.drawImage(playerImgLeft, playerImgPosX, playerImgPosY, playerImgWidth, playerImgHeight, x, y, playerWidth, playerHeight);
				
				//Putting a sprite of the hero to face left
				let interChangingImg = setInterval(function(){
				
					let interChangingImg2 = setInterval(function(){
						playerImgPosX = 20, playerImgPosY = 38;
						
						ctx.drawImage(playerImgLeft, playerImgPosX, playerImgPosY, playerImgWidth, playerImgHeight, x, y, playerWidth, playerHeight);
						clearInterval(interChangingImg2);
					},100);
					
					if(playerImgPosX == 20){
						playerImgPosX = 55;
						playerImgPosY = 36;
						playerImgHeight = 18;
						ctx.drawImage(playerImgLeft, playerImgPosX, playerImgPosY, playerImgWidth, playerImgHeight, x, y, playerWidth, playerHeight);
					}
		
					clearInterval(interChangingImg);			
					
				}, 100);
								
				//interChangingImg;
				//ctx.fillRect(x, y, playerWidth, playerHeight);	
							
				//Drawing flag for player to pick up
				//cure.draw(ctx);
										
				//drawing a line to divide the two towns/cities/villages/locations/whatever/really
				//line.drawCenterLine(ctx);
			}
			
			//moving player up
			else if(event.key ==  "w"){
				//Checks if player has went out of the outer bound so that it stops moving
				if(y <= 0){
					y = 0;
				}
				else{
					y -= dy;
					if(cure.isCuring == true){
						cure.y -= dy;
					}
				}

				checkCollision(player, cure);
				
				ctx.clearRect(0, 0, outerWidth, outerHeight);
				ctx.fillRect(x, y, playerWidth, playerHeight);	
				if(player.isDropOffZone == true && cure.isCuring == true){
					ctx.fillText("Well Done!!!...", 500, 210, 500);
				}							
				//Drawing flag for player to pick up
				cure.draw(ctx);
													
				//drawing a line to divide the two towns/cities/villages/locations/whatever/really
				//line.drawCenterLine(ctx);
			}
		
			//moving player down
			else if(event.key ==  "s"){
				console.log(outerHeight);
				if(y >= (outerHeight - 279)){
					
					y = outerHeight - 279;
				}
				else{
					y += dy;
					if(cure.isCuring == true){
						cure.y += dy;
					}
					checkCollision(player, cure);
				}
			
				//Clearing the world to redraw player at a new position
				ctx.clearRect(0, 0, outerWidth, outerHeight);
				
				//Redraw player(Rectangle representing player)
				ctx.fillRect(x, y, playerWidth, playerHeight);	
				if(player.isDropOffZone == true && cure.isCuring == true){
					ctx.fillText("Well Done!!!...", 500, 210, 500);
				}									
				//Drawing flag for player to pick up
				cure.draw(ctx);
																
				//drawing a line to divide the two towns/cities/villages/locations/whatever/really
				//line.drawCenterLine(ctx);
			}
		});
	}
}

//This class represent the cure
class Cure{
	
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.dx = 5;
		this.dy = 5;
		this.cureWidth = 60;
		this.cureHeight = 60;
		//Initializing the X and Y positions of the drop off zone
		this.dropOffPosX = 90;
		this.dropOffPosY = 50;
		//Initializing the radius of the drop off zone
		this.dropOffRadius = 5;
		this.isCuring = false;
	}
	
	draw(ctx){
		let cureImg = document.getElementById("cure-image");

		//Initializing the X and Y position of the cure sprite to be copied from the original image-sprite
		let cureImgPosX = 34, cureImgPosY = 322;

		//Initializing the width and height of the cure sprite 
		let cureImgWidth = 29, cureImgHeight = 29;

		ctx.drawImage(cureImg, cureImgPosX, cureImgPosY, cureImgWidth, cureImgHeight, this.x, this.y, this.cureWidth, this.cureHeight);
		//ctx.fillRect(this.x, this.y, this.cureWidth, this.cureHeight);

		//Circle for player to drop the cure
		ctx.beginPath();
		ctx.arc(this.dropOffPosX, this.dropOffPosY, this.dropOffRadius/*radius*/, 0/*Start angle*/, 2*Math.PI/*End Angle*/);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.stroke();

		////Drawing enemy to shoot fire poison 
	}
}

//Class for defining an interface that will be able to draw lines to create and seperate paths on the 
//canvas (Game World)
class Line{
	
	constructor(){
	}
	
	drawCenterLine(ctx){
		
		ctx.beginPath();
		ctx.moveTo(450, 0);
		ctx.lineTo(450, 500);
		ctx.fillStyle = "black";
		ctx.stroke();
	}
}

//Function to check for player colliding
function checkCollision(objectOne, objectTwo){
	
	switch(event.key){
		case 'd': //When moving right
			//Checking if player hasn't gone beyonf the RHS bound
			if(objectOne.x >= (outerWidth - 174)){
				objectOne.x = outerWidth - 174;
			}
			else{
				objectOne.x += objectOne.dx;
			}
			console.log(objectOne.x);
			break;
		case 'a': //When moving left
			//Checking if player hasn't gone beyond the LHS bound
			if(objectOne.x <= 0){
				objectOne.x = 0;
			}
			else{
				objectOne.x -= objectOne.dx;
			}
			console.log(objectOne.x);
			break;
		case 's': //When moving down
			//Check if player has below the lower bound of the page
			if(objectOne.y >= outerHeight - 279){
				objectOne.y += outerHeight - 279;
			}
			else{
				objectOne.y += objectOne.dy;
			}
			console.log(objectOne.y);
			break;
		case 'w': //When moving up
			//Check if player has went beyond the upper bounds
			if(objectOne.y <= 0){
				objectOne.y = 0;
			}
			else{
				objectOne.y -= objectOne.dy;
			}
			console.log(objectOne.y);
			break;
		default:
			console.log("Invalid input please use the appropriate keys on your keyboard");
			break;
	}
	
	//This checks if player has collided with the cure
	if(objectOne.x < objectTwo.x + objectTwo.cureWidth &&
		objectOne.x + objectOne.playerWidth > objectTwo.x &&
		objectOne.y < objectTwo.y + objectTwo.cureHeight &&
		objectOne.y + objectOne.playerHeight > objectTwo.y)
	{
		if((objectOne.x >= 780 && objectOne.x <= 830) && (objectOne.y >= 260 && objectOne.y <= 290)){
			console.log(objectOne.x + "    " + objectOne.y + "    " + objectTwo.x + "    " + objectTwo.y + "    " +"collision detected");
			objectTwo.isCuring = true;
		}
	}
	//This checks whether player has collided with the drop off zone
	if(objectOne.x < objectTwo.dropOffPosX + objectTwo.dropOffRadius &&
		objectOne.x + objectOne.playerWidth > objectTwo.dropOffPosX &&
		objectOne.y < objectTwo.dropOffPosY + objectTwo.dropOffRadius &&
		objectOne.y + objectOne.playerHeight > objectTwo.dropOffPosY)
	{
		console.log(objectOne.x + "    " + objectOne.y + "    " + objectTwo.x + "    " + objectTwo.y + "    " +"collision detected");
		//Assert that the player has reached the drop off zone
		//And check player has the cure with him
		if(objectTwo.isCuring == true){
			objectOne.isDropOffZone = true;
		}
	}
}

//This code is for When the document loads, the first things that appear on the canvas (Game World)
window.onload = function(){
	
	//Initializing the canvas an everything in it
	var canva = document.querySelector("canvas");
	var ctx = canva.getContext("2d");
	
	//Initializing player and flag positions
	var playerYPos = 200,  playerXPos = 150, cureXPos = 800, cureYPos = 259;

	//Initializing player drop off zone positions
	//var dropOffPosX = 90, dropOffPosY = 50;
	
	//Initializing objects for the game world
	var player = new Player(playerXPos, playerYPos);
	var cure = new Cure(cureXPos, cureYPos);
	var line = new Line();
	
	//Drawing Player
	player.draw(ctx);
	
	//Drawing flag for player to pick up
	cure.draw(ctx);
	
	//drawing a line to divide the two towns/cities/villages/locations/whatever/really
	//line.drawCenterLine(ctx);
	
	//Moving the player to get the cure
	player.move(ctx, cure, line);
	
};