#pragma strict

var firstPressPos:Vector2;
var secondPressPos:Vector2;
var currentSwipe:Vector2;

function Start () {

}

function Update () {
Swipe ();
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
		 }
		 
		 //Swipe left
		 if (currentSwipe.x < 0.0f && currentSwipe.y > -0.5f && currentSwipe.y < 0.5f){
		 	Debug.Log("Left Swipe");
		 }
		 
		 //Swipe right
		 if (currentSwipe.x > 0.0f && currentSwipe.y > -0.5f && currentSwipe.y < 0.5f){
		 	Debug.Log("Right Swipe");
		 }
	}
	
	



}