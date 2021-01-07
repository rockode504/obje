console.log("Hello!");
img="";
status="";
objects= [];

function preload()
{
    img=loadImage("Clock.jpg")
}

function setup()
{
    canvas=createCanvas(420,380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML="Status - Detecting Objects...";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}

function draw()
{
    image(img,0,0,420,380);

    if(status !="")
    {
        objectDetector.detect(img, gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("Status").innerHTML="Status - Objects Detected!";
            document.getElementById("Howmany").innerHTML="Number Of Objects Detected - "+objects.length;
            fill(100,0,0);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(100,75,70);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}