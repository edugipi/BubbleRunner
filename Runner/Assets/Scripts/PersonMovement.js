#pragma strict

var cont:int; 
var person:Rigidbody;
var volar:boolean;
var olderPosition: float;
var firstPressPos:Vector2;
var secondPressPos:Vector2;
var currentSwipe:Vector2;
var swipeUp:boolean;
var swipeLeft:boolean;
var swipeRight:boolean;

function Start () {
 
 transform.position.x = 0;
 cont = 2;
 person = GetComponent.<Rigidbody>();
 
}

function Update () {


transform.rotation.x = 0;
transform.rotation.y = 0;
transform.rotation.z = 0;

movement();
Swipe();

}


//Do person Movement by forces
function movement (){
	var hit : RaycastHit;
	
	if (person.velocity==Vector3.zero){
		
		//Right Key Press
		if (Input.GetKeyDown (KeyCode.RightArrow) || swipeRight == true){
			//Raycast not hitting
			if (Physics.Raycast(transform.position, Vector3.right, hit, 1.0) != true){ 
			
				if (cont!= 3 && volar==false){
						person.AddRelativeForce(Vector3(1,0,0)*250);
						cont++;
						person.velocity=Vector3.zero;
				}
			}
			//Raycast hit
			else {
				if (hit.transform.gameObject.tag == "NormalObstacle"){
					person.velocity=Vector3.zero;
				}
				else if (hit.transform.gameObject.tag == "ReboundObstacle"){
					person.AddRelativeForce(Vector3(-1,0,0)*250);
					cont--;
				}
			}
			//swipeRight = false;	
		}
		
		//Left Key Press
		if (Input.GetKeyDown (KeyCode.LeftArrow) || swipeLeft == true){ 
			//Raycast not hitting
			if (Physics.Raycast(transform.position, Vector3.left, hit, 1.0) != true){ 
				
				if (cont!= 1 && volar==false){
					person.AddRelativeForce(Vector3(-1,0,0)*250);
					cont--;
					person.velocity=Vector3.zero;
				}
			}
			//Raycast hit
			else {
				if (hit.transform.gameObject.tag == "NormalObstacle"){
					person.velocity=Vector3.zero;
				}
				else if (hit.transform.gameObject.tag == "ReboundObstacle"){
					person.AddRelativeForce(Vector3(1,0,0)*250);
					cont++;
				}
			}
			//swipeLeft = false;
		}
		
		//Up Key Pressed
		if (Input.GetKeyDown (KeyCode.UpArrow) && volar==false || swipeUp == true && volar==false){
			person.AddRelativeForce(transform.up * 250);
			volar=true;
			//swipeUp = false;
			}
	}
	swipeRight = false;
	swipeLeft = false;
	swipeUp = false;	
}
	
//Collision with GameObjects
function OnCollisionEnter(collision: Collision) {
	
	if (collision.gameObject.tag == "rampa")
		volar = false;
	if (collision.gameObject.tag == "NormalObstacle")
		volar = false;
	if (collision.gameObject.tag == "ReboundObstacle")
		volar = false;
	//Collision 
	if (collision.gameObject.tag == "ExploteObstacle"){
		Destroy(gameObject);
		Application.LoadLevel("GameOver");
	}
	
	
}

public function Swipe () {

	if (Input.GetMouseButtonDown(0)){
		//Save began touch 2D point
		firstPressPos = new Vector2(Input.mousePosition.x, Input.mousePosition.y);		
	}
	
	if (Input.GetMouseButtonUp(0)){
		//Save ended touch 2D point
		secondPressPos = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
		
		//Create vector from the two points
		currentSwipe = new Vector2(secondPressPos.x - firstPressPos.x, secondPressPos.y - firstPressPos.y);
		
		//Normalize the 2D Vector
		currentSwipe.Normalize();
		
		//Swipe upwards
		if (currentSwipe.y > 0.0f && currentSwipe.x > -0.5f && currentSwipe.x < 0.5f){
			Debug.Log("Up Swipe");
			swipeUp = true;	
		 }
		 
		 //Swipe left
		 if (currentSwipe.x < 0.0f && currentSwipe.y > -0.5f && currentSwipe.y < 0.5f){
		 	Debug.Log("Left Swipe");
		 	swipeLeft = true;
		 }
		 
		 //Swipe right
		 if (currentSwipe.x > 0.0f && currentSwipe.y > -0.5f && currentSwipe.y < 0.5f){
		 	Debug.Log("Right Swipe");
		 	swipeRight = true;
		 }
	}

}