song1 = 'Stardust.mp3';
song2 = 'Fugent.mp3';
songStatusLeft = [];
songStatusRight = [];
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("Stardust.mp3");
    song2 = loadSound("Fugent.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses() {
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    songStatusLeft = song1.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(songStatusLeft == false)
        {
            song1.play();

            document.getElementById("song-title").innerHTML = "Song: Stardust";
        }
    }

    songStatusRight = song2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(songStatusRight == false)
        {
            song2.play();
            
            document.getElementById("song-title").innerHTML = "Song: Fugent";
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}