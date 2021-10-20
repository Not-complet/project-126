song1 = "";
song2 = "";
rightWristX = 0;
leftWristX = 0;
rightWristY = 0;
leftWristY = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3"); 
}
function setup(){
    canvas = createCanvas(550,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose",gotPoses);
}
function draw(){
    image(video,0,0,600,500);
}
function modelLoaded(){
    console.log("PoseNet Loaded!");
}
function gotPoses(results){
    if(results.length > 0){
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristY = results[0].pose.leftWrist.y;
    }
}