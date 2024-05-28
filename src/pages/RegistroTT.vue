<template>
  <q-page class="flex container2" padding>
    <q-btn flat @click="onRetornoClick" class="botaoRetorno">
      <div class="text-BotaoRetorno">&lt;</div>
    </q-btn>

    <video ref="video" class="Camera" v-show="!photo" autoplay></video>
    <q-btn @click="capturePhoto" class="botao-foto" label="Tirar Foto" />
    <q-img v-if="photo" :src="photo" class="captured-image" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      photo: null, // Aqui será armazenada a imagem capturada
      stream: null, // Stream da câmera
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    onRetornoClick() {
      this.$router.push('/home');
    },
    async startCamera() {
      if (window.cordova) {
        this.startMobileCamera();
      } else {
        this.startWebCamera();
      }
    },
    async startWebCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // Prefere usar a câmera traseira
        });
        this.$refs.video.srcObject = this.stream;
      } catch (error) {
        console.error('Erro ao acessar a câmera: ', error);
      }
    },
    async startMobileCamera() {
      // Utilize plugins Cordova ou Capacitor aqui
      // Exemplo com Capacitor Camera
      const { Camera, CameraResultType } = Capacitor.Plugins;
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      this.photo = image.webPath;
    },
    capturePhoto() {
      if (!window.cordova) {
        const canvas = document.createElement('canvas');
        const video = this.$refs.video;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawimage(video, 0, 0);
        this.photo = canvas.toDataURL('image/jpeg');

        // Para parar a câmera após tirar a foto
        this.stream.getTracks().forEach((track) => track.stop());
      }
    },
  },
  beforeUnmount() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  },
};
</script>
