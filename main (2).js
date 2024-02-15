song="";
song2="";
scoreLeftWrist=0;
scoreRightWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload() {
  song=loadSound("music.mp3");  
  song2=loadSound("watr.mp3");
}

function setup() {
    canvas=createCanvas(600 , 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist=" + scoreRightWrist + "scoreLeftWrist=" + scoreLeftWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX +"leftWristY ="+ leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX =" + rightWristX +"rightWristY ="+ righttWristY);
    }
}

function modelLoaded() {
    console.log('poseNet is initialized');
}

function draw() {
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");
  
    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
    }
    if (rightWristY > 0 && rightWristY <= 100 && rightWristY<0) {
        document.getElementById("speed").innerHTML="Next song playing now...";
        song2.play();
    }
        if (lefttWristY > 0 && rightWristY <= 100 && rightWristY<0) {
            document.getElementById("speed").innerHTML="Other song playing shortly...";
            song.play();
        }
    

  
    }

function play() {
    song.play();
    song2.play()
    song.setVolume(1);
    song.rate(1);
}

