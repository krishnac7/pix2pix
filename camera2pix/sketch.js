const SIZE = 256;

let inputCanvas,outputContainer,statusMsg,pix2pix,clearBtn,modelReady = false,isTransfering = false,video,model='models/edges2cats_AtoB.pict'

function setup(){
    inputCanvas = createCanvas(SIZE,SIZE);
    video = createCapture(VIDEO);
    video.hide();
    
    inputCanvas.class('border-box').parent('canvasContainer');
    
    
    outputContainer = select('#output');
    statusMsg = select('#status');
    
    
    clearBtn = select('#clearBtn');
    clearBtn.mousePressed(function(){
        clearCanvas();
    });
    stroke(0);
    pixelDensity(1);
    
    catsBtn = select('#catsBtn');
    catsBtn.mousePressed(function(){
        model="models/edges2cats_AtoB.pict"
        setup();
    })
    
     pikachuBtn = select('#pikachuBtn');
    pikachuBtn.mousePressed(function(){
        model="models/edges2pikachu.pict"
        setup();
    })
    
     shoesBtn = select('#shoesBtn');
    shoesBtn.mousePressed(function(){
        model="models/edges2shoes_AtoB.pict"
        setup();
    })
    
     handbagsBtn = select('#handbagsBtn');
    handbagsBtn.mousePressed(function(){
        model="models/edges2handbags_AtoB.pict"
        setup();
    })
    
    pix2pix = ml5.pix2pix(model,modelLoaded);
}

function draw(){
    image(video,0,0,SIZE,SIZE);
    filter('GRAY')
    filter('ERODE')
    filter('BLUR')
}

function modelLoaded(){
    statusMsg.html('ModelLoaded!');
    modelReady= true;
    
    transfer();
}


function clearCanvas(){
    background(255);
}
setInterval(transfer,3000)
function transfer(){
    isTransfering = true;
    statusMsg.html('Applying style transfer');
    const canvasElement = select('canvas').elt;
    
    pix2pix.transfer(canvasElement,function(err,result){
        if(err){
            console.log(err);
        }
        if (result &&result.src){
            isTransfering = false;
            outputContainer.html('');
            createImg(result.src).class('border-box').parent('output');
            statusMsg.html('Done!');
        }
    });
}
