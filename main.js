var song1 = "";
var song2 = "";
var rightWristX = 0;
var leftWristX = 0;
var rightWristY = 0;
var leftWristY = 0;
var leftWristScore = 0;
var rightWristScore = 0;
var song_status1 = "";
var song_status2 = "";
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
    fill("#14deca");
    stroke("#14deca");
    song_status1 = song1.isPlaying();
    song_status2 = song2.isPlaying();
    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song_status1 == false){
            song1.play();
            document.getElementById("song").innerHTML = "Current Song: Song 1 (left wrist)";
        }
    }
    if(rightWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song_status2 == false){
            song2.play();
            document.getElementById("song").innerHTML = "Current Song: song2 (right wrist)";
        }
    }
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
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("left wrist x and y: " + leftWristX + ", "+ leftWristY);
        console.log("right wrist x and y: "+ rightWristX +  ", " + rightWristY);
        console.log("left wrist score: " + leftWristScore);
        console.log("right wrist score: " + rightWristScore);
    }
}