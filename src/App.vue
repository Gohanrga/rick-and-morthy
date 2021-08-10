<template>
  <v-app class="mx-auto overflow-hidden">
    <v-main >
      <router-view/>
    </v-main>
      <v-footer
        padless
      >
        <v-img
          :src="background"
          max-height="100"
          class="pa-0 ma-0"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
        </v-img>
      </v-footer>
    <SnackBar/>
    <Progress/>
  </v-app>
</template>
<script>
import SnackBar from './components/snackBar.vue';
import Progress from './components/progress.vue';
import {mapActions, mapState} from 'vuex';
export default {
  name: 'App',
  components:{
    SnackBar,
    Progress
  },
  data: () => ({
   
  }),
  computed:{
      ...mapState(['background']),
  },
  mounted() {
    //this.offProgress();
    this.setCleanSnackBar();
  },
  methods:{
    ...mapActions(['offProgress', 'setCleanSnackBar'])
  }
  
};
</script>
