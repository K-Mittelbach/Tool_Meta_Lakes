<template>
  <v-app>
    <v-app-bar app color="white" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src=".\assets\varda-logo.svg"
          transition="scale-transition"
          width="175"
        />
      </div>
    </v-app-bar>

    <v-main>
      <Lakes />
    </v-main>
  </v-app>
</template>

<script>
import Lakes from "./components/Lakes";

export default {
  name: "App",
  components: {
    Lakes,
  },

  data: () => ({
    
  }),
};
</script>