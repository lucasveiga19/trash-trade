<template>
  <q-page class="flex container2">
    <q-btn flat @click="onRetornoClick" class="botaoRetorno">
      <div class="text-BotaoRetorno">&lt;</div>
    </q-btn>

    <div class="logoPontos">
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect width="45" height="45" fill="url(#pattern0_1653_1843)" />
        <defs>
          <pattern
            id="pattern0_1653_1843"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_1653_1843" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_1653_1843"
            width="64"
            height="64"
            xlink:href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </div>

    <div class="text-labelTituloRecompensa">Pontos acumulados: 12</div>

    <div class="container-Premios">
      <div class="centered-square-Premios"></div>
    </div>
    <div class="container-Premios1">
      <div class="centered-square-Premios1"></div>
    </div>
    <div class="container-Premios2">
      <div class="centered-square-Premios2"></div>
    </div>
    <div class="container-Premios3">
      <div class="centered-square-Premios3"></div>
    </div>
    <div class="container-Premios4">
      <div class="centered-square-Premios4"></div>
    </div>

    <div class="container-Recompensa">
      <div class="centered-square-Recompensa"></div>
    </div>
    <div class="text-Premios">Prêmios do mês</div>
  </q-page>
</template>

<script>
export default {
  methods: {
    onRetornoClick() {
      this.$router.push('/home');
    },
    onRecompensaClick() {
      this.$router.push('/recompensa');
    },
  },
};
</script>
