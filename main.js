song1 = ""
song2 = ""
 
statusSong1 = "";
statusSong2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;
function setup() {
    canvas = createCanvas(600, 600)
    canvas.center()
    video = createCapture(600, 600)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Is Initialized");
  }
  
  function gotPoses(results) {
    if (results.length > 0) {
      console.log(results);
      scoreRightWrist = results[0].pose.keypoints[10].score;
      scoreLeftWrist = results[0].pose.keypoints[9].score;
      console.log(
        "scoreRightWrist = " +
          scoreRightWrist +
          " scoreLeftWrist = " +
          scoreLeftWrist
      );
  
      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log(
        "rightWristX = " + rightWristX + " rightWristY = " + rightWristY
      );
  
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
  }
  
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop()
        if (song2_status == false) {
          song2.play()
          document.getElementById("song name").innerHTML = "playing - Harry Potter Song"  
        }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop()
        if (song1_status == false) {
          song1.play()
          document.getElementById("song name").innerHTML = "playing - Peter Pan Song"
        }
    }
    
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}