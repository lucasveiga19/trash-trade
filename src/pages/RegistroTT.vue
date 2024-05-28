<template>
  <q-page class="flex container2" padding>
    <q-btn flat @click="onRetornoClick" class="botaoRetorno">
      <div class="text-BotaoRetorno">&lt;</div>
    </q-btn>
    <div class="text-labelTituloRecompensas">Realize o Registro</div>

    <video
      ref="video"
      class="Camera"
      :class="{ hidden: photo }"
      autoplay
    ></video>
    <q-btn
      v-show="!photo"
      @click="capturePhoto"
      class="botao-foto"
      label="Tirar Foto"
    />

    <div class="flex container2">
      <q-img v-if="photo" :src="photo" class="photoSalva" />
      <q-btn
        v-if="photo"
        icon="delete"
        class="botao-delete"
        @click="deletePhoto"
      />
    </div>

    <q-form @submit="onSubmit" class="flex">
      <q-input
        v-model.number="batteryCount"
        @input="validateInput"
        min="1"
        outlined
        type="number"
        class="text-labelBaterias"
        label="Números de Baterias"
        label-color="white"
        color="white"
      />

      <q-btn label="Enviar" type="submit" class="full-width botao-enviar" />
    </q-form>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      photo: null, // Aqui será armazenada a imagem capturada
      stream: null, // Stream da câmera
      batteryCount: null,
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    onRetornoClick() {
      this.$router.push('/home');
    },
    async onSubmit() {
      try {
        this.$q.notify({
          color: 'orange-4',
          textColor: 'white',
          icon: 'warning',
          message: 'Aguarde! Tem muita gente reciclando',
        });

        const checkResponseScore = await axios.patch(
          'https://trashtrade.onrender.com/api/addScore',
          {
            registration: this.$store.getters.getMatricula,
            scoreToAprove: this.batteryCount,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Success:', checkResponseScore);

        console.log(this.photo);

        const checkResponseImg = await axios.post(
          'https://trashtrade.onrender.com/api/image',
          {
            base64Image: this.photo,
            registration: this.$store.getters.getMatricula,
            numberBatteries: this.batteryCount,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Success:', checkResponseImg);

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Registro realizado com sucesso!',
        });

        this.$router.push('/home');
      } catch (error) {
        console.error('Axios Error:', error);
        if (error.response) {
          // O servidor respondeu com um status fora do intervalo 2xx
          console.log('Response data:', error.response.data);
          console.log('Response status:', error.response.status);
          console.log('Response headers:', error.response.headers);
          if (error.response.status === 401) {
            this.$q.notify({
              color: 'orange-4',
              textColor: 'white',
              icon: 'warning',
              message: 'Registro não realizado!',
            });
            return;
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Erro no servidor: ' + error.response.status,
            });
          }
        } else if (error.request) {
          // A requisição foi feita mas não houve resposta
          console.log('No response:', error.request);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Nenhuma resposta do servidor.',
          });
        } else {
          // Algo aconteceu na configuração da requisição que disparou um erro
          console.log('Error Message:', error.message);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Erro ao fazer a requisição: ' + error.message,
          });
        }
      }
    },
    validateInput(event) {
      // Impede '0' como primeiro dígito e o símbolo '-'
      if (
        (event.key === '0' && !this.batteryCount) ||
        event.key === '-' ||
        event.key === '--'
      ) {
        event.preventDefault();
      }
    },
    async startCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' } // Prefere usar a câmera traseira
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
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photo = canvas.toDataURL('image/webp', 0.2);

      // Para parar a câmera após tirar a foto
      this.stream.getTracks().forEach((track) => track.stop());
    },
    deletePhoto() {
      this.photo = null;
      this.startCamera();
    },
  },
  beforeUnmount() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  },
};
</script>

<style>
.q-input {
  background-color: #326942;
  border-radius: 1%;
}

.q-form {
  justify-content: center;
  align-items: center;
  width: center;
}
</style>
