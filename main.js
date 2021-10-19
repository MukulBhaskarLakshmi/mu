song_Life_Of_Ram = "";
song_okey_oka_lokam = "";
left_x = "0";
left_y = "0";
right_x = "0";
right_y = "0";
left_wrist = "0";
right_wrist = "";



function preload() {
    song_Life_Of_Ram = loadSound("The Life Of Ram.mp3");
    song_okey_oka_lokam = loadSound("Okey Oka Lokam.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, Model_loaded);
    poseNet.on('pose', got_poses);


}


function Model_loaded() {
    console.log("Model Loaded !!");
}


function draw() {
    image(video, 0, 0, 500, 400);
    song_Life_Of_Ram.isPlaying()
    song_okey_oka_lokam.isPlaying();
    if (right_wrist > 0.0) {
        fill(0, 255, 0);
        stroke(0, 255, 0);
        circle(right_x, right_y, 20);
        song_Life_Of_Ram.stop();
        if (song_okey_oka_lokam == false) {
            song_okey_oka_lokam.isPlaying();
            document.getElementById("song_name").innerHTML = "song_okey_oka_lokam is playing";
        }
    }
    if (left_wrist > 0.0) {
        fill(0, 255, 0);
        stroke(0, 255, 0);
        circle(left_x, left_y, 20);
        song_okey_oka_lokam.stop();
        if (song_Life_Of_Ram == false) {
            song_Life_Of_Ram.isPlaying();
            document.getElementById("song_name").innerHTML = "song_Life_Of_Ram is playing";
        }
    }

}

function got_poses(results) {
    if (results.length > 0) {
        console.log(results);
        left_x = results[0].pose.leftWrist.x;
        left_y = results[0].pose.leftWrist.y;

        right_x = results[0].pose.rightWrist.x;
        right_y = results[0].pose.rightWrist.y;
        left_wrist = results[0].pose.keypoints[9].score;
        right_wrist = results[0].pose.keypoints[10].score;
    }

}