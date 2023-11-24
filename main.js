var mediaStream;

function abrirCamera() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function (stream){
        mediaStream = stream;

        const areaVideo = document.getElementById('camera');
        areaVideo.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Erro ao acessar a câmera:', error);
    });
}

function tirarFoto(){
    const areaVideo = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = areaVideo.videoWidth;
    canvas.height = areaVideo.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(areaVideo, 0, 0 ,canvas.width, canvas.height);

    //Convertendo a imagem para o formato base64
    const imageDataURL = canvas.toDataURL();

    //Armazenando a imagem no background da div
const fotoDiv = document.getElementById('foto');
fotoDiv.style.backgroundImage = `url(${imageDataURL})`;

const downloadLink = document.createElement('a');

downloadLink.href = imageDataURL;
downloadLink.download = 'foto.png';
downloadLink.textContent = 'Clique para baixar';
document.body.appendChild(downloadLink);
}
function fechar(){
    navigator.mediaDevices.getUserMedia({ video: false });
    const areaVideo = document.getElementById('camera');
    areaVideo.srcObject = null;
    mediaStream = null;
}

