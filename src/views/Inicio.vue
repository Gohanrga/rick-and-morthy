<template>
    <div class="text-center">
        <v-img
            :src="background"
            class="content"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
            <div class="content-inicial">
                <div class="content--logo">
                    <v-img
                        :src="logo"
                    >
                    </v-img>
                    <div class="mt-5">
                        <h2>Bienvenido a Rick and Morty</h2>
                    </div>
                    <div class="mt-5 mb-5">
                        <span>En esta prueba, evaluaremos su capacidad para construir la aplicación mediante el analisis de código y la reproducción del siguiente diseño.</span>
                    </div>
                    <div>
                        <v-btn
                        rounded
                        color="tertiary"
                        class="white--text"
                        @click="iniciar"
                        >
                        Continuar
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-img>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['background', 'logo']),
    },
    methods: {
        iniciar(){
            this.$router.push({name: 'personajes' })
        }
    },
}
</script>