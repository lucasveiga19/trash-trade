<template>
  <q-page class="flex container2" padding>
    <video ref="video" class="Camera" autoplay></video>
    <q-btn @click="capturePhoto" class="botao-foto" label="Tirar Foto" />
    <q-img v-if="photo" :src="photo" />
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
    async startCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.video.srcObject = this.stream;
      } catch (error) {
        console.error('Erro ao acessar a câmera: ', error);
      }
    },
    capturePhoto() {
      const canvas = document.createElement('canvas');
      const video = this.$refs.video;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      this.photo = canvas.toDataURL('image/jpeg');

      // Para parar a câmera após tirar a foto
      this.stream.getTracks().forEach((track) => track.stop());
    },
  },
  beforeUnmount() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  },
};
</script>
