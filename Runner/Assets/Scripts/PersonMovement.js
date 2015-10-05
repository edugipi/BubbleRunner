#pragma strict

var cont:int; 
var person:Rigidbody;
var volar:boolean;
var olderPosition: float;

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

}


//Do person Movement by forces
function movement (){
	var hit : RaycastHit;
	
	if (person.velocity==Vector3.zero){
		
		//Right Key Press
		if (Input.GetKeyDown (KeyCode.RightArrow)){
			//Raycast not hitting
			if (Physics.Raycast(transform.position, Vector3.right, hit, 1.0) != true){ 
			
				if (cont!= 3 && volar==false){
						person.AddRelativeForce(Vector3(1,0,0)*250);
						cont++;
						//person.velocity=Vector3.zero;
				}
			}
			//Raycast hit
			else {
				if (hit.transform.gameObject.name == "NormalObstacle"){
					person.velocity=Vector3.zero;
				}
				else if (hit.transform.gameObject.name == "ReboundObstacle"){
					person.AddRelativeForce(Vector3(-1,0,0)*250);
					cont--;
				}
			}
			
		}
		
		//Left Key Press
		if (Input.GetKeyDown (KeyCode.LeftArrow)){ 
			//Raycast not hitting
			if (Physics.Raycast(transform.position, Vector3.left, hit, 1.0) != true){ 
				
				if (cont!= 1 && volar==false){
					person.AddRelativeForce(Vector3(-1,0,0)*250);
					cont--;
					//person.velocity=Vector3.zero;
				}
			}
			//Raycast hit
			else {
				if (hit.transform.gameObject.name == "NormalObstacle"){
					person.velocity=Vector3.zero;
				}
				else if (hit.transform.gameObject.name == "ReboundObstacle"){
					person.AddRelativeForce(Vector3(1,0,0)*250);
					cont++;
				}
			}
		}
		
		//Up Key Pressed
		if (Input.GetKeyDown (KeyCode.UpArrow) && volar==false && person.velocity == Vector3.zero){
			//olderPosition = person.transform.position.x;
			person.AddForce(transform.up * 250);
			volar=true;
			//person.transform.position.x = olderPosition;
			}
	}

}
	
//Collision with GameObjects
function OnCollisionEnter(collision: Collision) {
	
	if (collision.gameObject.tag == "rampa")
		volar=false;
	
	//Collision 
	if (collision.gameObject.tag == "ExploteObstacle"){
		Destroy(gameObject);
		Application.LoadLevel("GameOver");
	}
	
	
}

