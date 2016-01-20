#pragma strict

var person2: GameObject;

function Start () {

}

function Update () {
OnKeyPressed();
}

function Divide(){
	transform.position.x = -1;
 	Instantiate(person2, Vector3(1, 0, 0), Quaternion.identity);
}

function OnKeyPressed(){
	if (Input.GetKeyDown("y")) Divide();
}