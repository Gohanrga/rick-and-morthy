<template>
    <v-app-bar
        flat
        :src="background"
        height="400px"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        class="content"
        
    >
        <div class="appbar-content">
            <div class="appbar--logo">
                <v-img
                    :src="logo"
                >
                </v-img>
            </div>
            <TextBusqueda 
                ref="busqueda"
                label='Buscar Personaje...'
                icon='mdi-magnify'
                :onClick="buscaPersonaje"
            />
        </div>
    </v-app-bar>
</template>
<script>
import TextBusqueda from '../components/textBusqueda.vue'
import ObtienePersonajes from '../mixins/ObtienePersonajes.vue'
import {mapState} from 'vuex';
export default {
    components:{
        TextBusqueda
    },
    computed:{
        ...mapState(['background', 'logo']),
    },
    mixins:[ObtienePersonajes],
    methods: {
        buscaPersonaje(texto){
            let query = `?name=${texto}`
            this.obtienePersonajes(query)
        },
        limpiaTextoBusqueda(){
            this.$refs.busqueda.limpiaTextoBusqueda()
        }
    },
}
</script>