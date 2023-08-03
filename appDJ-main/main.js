musica = "";
pontosPulsoDireito = 0;
pontosPulsoEsquerdo = 0;

pulsoDireitoX = 0;
pulsoDireitoY = 0;

pulsoEsquerdoX = 0;
pulsoEsquerdoY = 0;

function preload() {
     musica = loadSound("enemy.mp3");
    }


function play() {
    musica.play();
    musica.setVolume(1);
    musica.rate(1); //controla velocidade no contexto do P5
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(400,300);

    video = createCapture(VIDEO); //WebCam
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
} 

function modelLoaded() {
    console.log('Deu Certo!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        pontosPulsoDireito = results[0].pose.keypoints[10].score;
        pontosPulsoEsquerdo = results[0].pose.keypoints[9].score;
        
        pulsoDireitoX = results[0].pose.rightWrist.x;
        pulsoDireitoY = results[0].pose.rightWrist.y;

        pulsoEsquerdoX = results[0].pose.leftWrist.x;
        pulsoEsquerdoY = results[0].pose.leftWrist.y;
    }
}

//Continuação na Proxima Aula :)

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (pontosPulsoDireito > 0.2) {
        circle(pulsoDireitoX, pulsoDireitoY, 20);

        if(pulsoDireitoX > 0 && pulsoDireitoY <=100) {
            document.getElementById("speed").innerHTML = "velocidade = 0.5x";
            musica.rate(0.5);
        }
        else if (pulsoDireitoX > 100 && pulsoDireitoY <= 200) {
            document.getElementById("speed").innerHTML = "Velocidade = 1x";
            musica.rate(1);
        }
        else if (pulsoDireitoX > 200 && pulsoDireitoY <= 300) {
            document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
            musica.rate(1.5);
        }
        else if (pulsoDireitoX > 300 && pulsoDireitoY <= 400) {
            document.getElementById("speed").innerHTML = "Velocidade = 2x";
            musica.rate(2);
        }
        else if(pulsoDireitoY > 400) {
            document.getElementById("speed").innerHTML = "Velocidade = 2.5x";
            musica.rate(2.5);
        }
    }

    if (pontosPulsoEsquerdo > 0.2) {
        circle(pulsoEsquerdoX, pulsoEsquerdoY, 20);
        numeroPulsoEsquerdoY = Number(pulsoEsquerdoY);// convertendo string para número
        remove_decimals = floor(numeroPulsoEsquerdoY);// floor arredonda para inteiro
        volume = remove_decimals / 500; // pega o valor do inteiro do pulso X e Y e divide por 500
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        musica.setVolume(volume) ;
    }
}