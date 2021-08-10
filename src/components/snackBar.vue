<template>
    <v-snackbar
        v-model="snackBar.snackBar"
        :color="snackBar.color"
        multi-line
        :timeout="snackBar.timeout"
        vertical
        top
        >
        {{ snackBar.text }}
        <v-btn text @click="snackBar.snackBar = false">Cerrar</v-btn>
    </v-snackbar>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['snackBar']),
    },
}
</script>