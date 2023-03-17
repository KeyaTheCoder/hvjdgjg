
status = "";
object = [];




function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(500, 500);
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function draw() {
    image(video, 0, 0, 500, 500);

    if (status != "")
    {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are :" + object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function modalLoaded() {
    console.log("model loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}