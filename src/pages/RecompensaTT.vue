<template>
  <q-page class="flex container2">
    <q-btn flat @click="onRetornoClick" class="botaoRetorno">
      <div class="text-BotaoRetorno">&lt;</div>
    </q-btn>

    <div class="container-Premios">
      <q-carousel
        v-model="slide"
        arrows
        class="centered-square-Premios"
        navigation
        swipeable
        animated
        infinite
        control-color="white"
        transition-prev="scale"
        transition-next="scale"
        height="400px"
      >
        <q-carousel-slide name="slide1">
          <q-img src="../assets/premio1.svg" />
        </q-carousel-slide>
        <q-carousel-slide name="slide2">
          <q-img src="../assets/premio2.svg" />
        </q-carousel-slide>
        <q-carousel-slide name="slide3">
          <q-img src="../assets/premio3.svg" />
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div class="centered-square-Recompensa"></div>
    <div class="text-Premios">Prêmios do mês</div>

    <div class="centered-square-Duvidas">
      <q-expansion-item
        class="shadow-1 overflow-hidden centered-Duvidas"
        style="border-radius: 30px"
        icon="info"
        label="Quem pode Participar?"
        @show="startCounting"
        @hide="stopCounting"
        header-class="bg-secondary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section>
            Todos os alunos, ex-alunos, funcionários e professores da unifor que tenham a matricula.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        class="shadow-1 overflow-hidden centered-Duvidas"
        style="border-radius: 30px"
        icon="info"
        label="Como receber o Prêmio?"
        @show="startCounting"
        @hide="stopCounting"
        header-class="bg-secondary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section>
            Será divulgado uma data para as pessoas que mais acumularem pontos naquele mês recebam num local e horário definido pela equipe TrashTrade.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        class="shadow-1 overflow-hidden centered-Duvidas"
        style="border-radius: 30px"
        icon="info"
        label="O que é Trashcoins?"
        @show="startCounting"
        @hide="stopCounting"
        header-class="bg-secondary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section>
            São as moedas contabilizadas a partir das reciclagens feitas e aprovadas, quanto mais Trashcoins, mais chance de ficar em primeiro no ranking para ganhar os prêmios.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        class="shadow-1 overflow-hidden centered-Duvidas"
        style="border-radius: 30px"
        icon="info"
        label="O que é aquele número Em Aprovação?"
        @show="startCounting"
        @hide="stopCounting"
        header-class="bg-secondary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section>
            Após realizar um registro de reciclagem, seus pontos serão contabilizados e ficaram em aguardo até que a equipe da Trashtrade aprove e seus pontos sejam efetivados em Trashcoins.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      slide: ref('slide1'),
    };
  },
  methods: {
    goToSlide(index) {
      this.slide = index;
    },
    onRetornoClick() {
      this.$router.push('/home');
    },
    onRecompensaClick() {
      this.$router.push('/recompensa');
    },
  },
};
</script>
