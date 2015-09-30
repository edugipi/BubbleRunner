#pragma strict


public var rightDirectionRebound : boolean;

var cont:int; 
var person:Rigidbody;
var volar:boolean;

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
						rightDirectionRebound = true;
						person.AddForce(Vector3(1,0,0)*250);
						cont++;
						//person.velocity=Vector3.zero;
				}
			}
			//Raycast hit
			else {
				if (hit.transform.gameObject.name == "NormalObstacle"){
					person.velocity=Vector3.zero;
				}
			}
			
		}
		
		//Left Key Press
		if (Input.GetKeyDown (KeyCode.LeftArrow)){ 
			//Raycast not hitting
			if (Physics.Raycast(transform.position, Vector3.left, hit, 1.0) != true){ 
				
				if (cont!= 1 && volar==false){
					rightDirectionRebound = false;
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
			}
		}
		
		//Up Key Pressed
		if (Input.GetKeyDown (KeyCode.UpArrow) && volar==false){
			person.AddForce(transform.up * 250);
			volar=true;}
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

