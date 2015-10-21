#pragma strict
var objecte:Rigidbody;

function Start () {
objecte = GetComponent.<Rigidbody>();

}

function Update () {

objecte.velocity = Vector3(0,0,-20);

}