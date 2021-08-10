<template>
    <div>
        <AppbarBusqueda ref="appbarBusqueda"/>
        <v-item-group mandatory class="secondary">
            <v-container >
                <v-row>
                    <v-col class="pa-0" v-for="menu in menuQuery" :key="menu.nombre" @click="obtienePersonajes(menu.query)">
                        <v-item v-slot="{ active, toggle }">
                            <div :class="['boton-menu', active ? 'menu-active': '']"
                                @click="toggle"
                            >
                                <span>{{menu.nombre}}</span>
                            </div>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        
        <v-container >
            <div class="mb-5 mt-5">
                <span>Mostrar favoritos:</span>
                <BotonFavorito
                    :favorito="favorito"
                    :onClick="filtraFavoritos"
                />
            </div>
            <v-row align="center" justify="center" v-if="personajeNoEncontrado">
                <v-col cols="12" sm="11" md="3" lg="2">
                    <div class="text-center">
                        <h2>Uh-oh!</h2>
                        <div class="body-2 mt-2"><span>¡Pareces perdido en tu viaje!</span></div>
                        <v-btn
                            rounded
                            color="tertiary white--text mt-3"
                            small
                            @click="reiniciaFiltros"
                        >
                            Eliminar Filtros
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="11" md="6" lg="4" v-for="personaje in personajes" :key="personaje.id">
                    <CardPersonaje
                        :personaje="personaje"
                        :marcaFavorito="marcaFavorito"
                        :verPersonaje="verPersonaje"
                    />
                </v-col>
            </v-row>
        </v-container>
        <div class="text-center mt-5 mb-5" v-if="paginacion.length!==0">
            <v-pagination
            v-model="pagina"
            :length="paginacion.pages"
            :total-visible="10"
            @input="cambiaPagina"
            ></v-pagination>
        </div>
        <!--dialog -->
        <v-dialog
            max-width="800"
            scrollable
            v-model="dialogDetalle"
            class="ma-0 pa-0 dialog"
        >
            <v-btn
                color="white"
                fab
                absolute
                top
                right
                icon
                class="btn"
                @click="cierraDetallePersonaje"
            >
                  <v-icon large>mdi-close-circle</v-icon>
            </v-btn>
            <DetallePersonaje
                :personajeProp="personajeSeleccionado"
                ref="detallePersonaje"
            />
        </v-dialog>
    </div>
</template>
<script>
import AppbarBusqueda from '../components/appbarBusqueda.vue'
import BotonFavorito from '../components/botonFavorito.vue'
import DetallePersonaje from './DetallePersonaje.vue'
import CardPersonaje from '../components/cardPersonaje.vue'
import {ApiService} from '../ApiService';
import {mapActions, mapState} from 'vuex';
import ObtienePersonajes from '../mixins/ObtienePersonajes.vue'
const apiService = new ApiService();
export default {
    components:{
        AppbarBusqueda,
        BotonFavorito,
        DetallePersonaje,
        CardPersonaje
    },
    data() {
        return {
            menuQuery:[
                {nombre: 'All', query: ''},
                {nombre: 'Unknown', query: '?gender=unknown'},
                {nombre: 'Female', query: '?gender=female'},
                {nombre: 'Male', query: '?gender=male'},
                {nombre: 'Genderless', query: '?gender=genderless'},
            ],

            favorito: false,
            pagina: 1,
            dialogDetalle: false,
            personajeSeleccionado: {}
        }
    },
    mixins:[ObtienePersonajes],
    mounted() {
        this.obtienePersonajes('')
    },
    computed:{
        ...mapState(['personajes', 'paginacion', 'personajeNoEncontrado', 'personajesFavoritos']),
    },
    methods: {
        ...mapActions(['offProgress', 'onProgress', 'setSnackBar', 'savePersonajes', 'savePersonajeFavorito']),
        filtraFavoritos(){
            this.favorito = !this.favorito
            if(this.favorito)
                this.savePersonajes(this.personajesFavoritos)
            else
                this.obtienePersonajes('')
        },
        marcaFavorito(id){
            this.savePersonajeFavorito(id)
        },
        cambiaPagina(){
            let query = `?page=${this.pagina}`
            this.obtienePersonajes(query);
        },
        reiniciaFiltros(){
            this.$refs.appbarBusqueda.limpiaTextoBusqueda()
            this.obtienePersonajes('')
        },
        verPersonaje(personaje){
            this.dialogDetalle = true
            this.personajeSeleccionado = personaje
        },
        cierraDetallePersonaje(){
            this.dialogDetalle = false
            this.personajeSeleccionado=[]
            this.$refs.detallePersonaje.limpiaVariables()
        }
    },
}
</script>