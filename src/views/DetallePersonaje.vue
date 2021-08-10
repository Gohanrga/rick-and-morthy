<template>
    <v-card class="ma-0 pa-0 card-dialog">
        <div class="card-head">
            <div class="card-head-img text-center">
                <v-img
                    :src="imgBackground"
                    max-height="240"
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >

                </v-img>
                <v-img
                    :src="personajeSeleccionado.image"
                    class="card-avatar"
                >
                </v-img>
                <div>
                <BotonFavorito 
                        :favorito="personajeSeleccionado.favorite"
                        class="poisicion-boton"
                />
                </div>
                <div class="card-personaje-info">
                    <div>{{personajeSeleccionado.status}}</div>
                    <div><h3>{{personajeSeleccionado.name}}</h3></div>
                    <div>{{personajeSeleccionado.species}}</div>
                </div>
            </div>
            
        </div>
        <v-card-text>
            <h3 class="mt-4">Información</h3>
            <v-row align="center" justify="space-between" class="mt-1">
                <v-col cols="12" sm="3" md="3" lg="4">
                    <InfoCard
                        icon="mdi-information"
                        textTitle="Gender:"
                        :infoText="personajeSeleccionado.gender"
                    />
                </v-col>
                <v-col cols="12" sm="11" md="3" lg="4">
                    <InfoCard
                        icon="mdi-information"
                        textTitle="Origin:"
                        :infoText="personajeSeleccionado.origin.name"
                        v-if="personajeSeleccionado.origin!==undefined"
                    />
                </v-col>
                <v-col cols="12" sm="11" md="3" lg="4">
                    <InfoCard
                        icon="mdi-information"
                        textTitle="Type:"
                        :infoText="personajeSeleccionado.type"
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text>
            <v-divider></v-divider>
        </v-card-text>
        <v-card-text>
            <h3 >Episodios</h3>
            <div class="text-center" v-if="cargandoEpisodios">
                <v-progress-circular
                indeterminate
                color="primary"
                ></v-progress-circular>
            </div>
            <v-row align="center" justify="center" class="mt-1">
                <v-col cols="12" sm="6" md="4" lg="3" v-for="episodio in episodios" :key="episodio.id">
                    <InfoCard
                        :textTitle="episodio.name"
                        :infoText="episodio.episode"
                        :dateInfo="episodio.air_date"
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text>
            <v-divider></v-divider>
        </v-card-text>
        <v-card-text>
            <h3 >Personajes Interesantes</h3>
            <v-row align="center" justify="center" class="mt-1">
                <v-col cols="12" sm="11" md="6" lg="6" v-for="personaje in personajesInteresantes" :key="personaje.id">
                    <CardPersonaje
                        :personaje="personaje"
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            rounded
            color="tertiary"
            dark
            class="ma-2"
            @click="compartirPersonaje"
            v-if="!isLink"
            >
            Compartir Personaje
            </v-btn>
        </v-card-actions>       
    </v-card>
</template>
<script>
import InfoCard from '../components/infoCard.vue'
import BotonFavorito from '../components/botonFavorito.vue'
import CardPersonaje from '../components/cardPersonaje.vue'
import {ApiService} from '../ApiService';
import {Utils} from '../utils/Utils'
import {mapActions, mapState} from 'vuex';
const utils = new Utils()
const apiService = new ApiService()
export default {
    components:{
        InfoCard,
        BotonFavorito,
        CardPersonaje
    },
    data() {
        return {
            imgBackground: 'https://i2.wp.com/codigoespagueti.com/wp-content/uploads/2020/05/Rick-Morty-Sexta-Temporada.jpg?resize=1200%2C720&quality=80&ssl=1',
            personajeSeleccionado: this.personajeProp,
            episodios: [],
            cargandoEpisodios: false,
            personajesInteresantes: [],
            idPersonaje1 : 0,
            idPersonaje2 : 0,
            isLink: false
        }
    },
    watch:{
        personajeProp(){
            if(this.personajeProp){
                this.personajeSeleccionado = this.personajeProp
                this.idPersonaje1 = utils.random(1, this.paginacion.count)
                this.idPersonaje2 = utils.random(1, this.paginacion.count)
                this.obtieneEpisodios()
                this.obtienePersonajesInteresantes()
            }
        }
    },
    props:{
        personajeProp:{
            type: Object,
            default:{}
        }
    },
    computed:{
        ...mapState(['paginacion', 'linkAplicacion', 'personajes']),
    },
    mounted() {
        if(this.$route.params && Object.keys(this.$route.params).length!==0){
            let idAux = Number(this.$route.params.id)
            this.idPersonaje1 = Number(this.$route.params.personaje1)
            this.idPersonaje2 = Number(this.$route.params.personaje2)
            this.obtienePersonaje(idAux)
            this.isLink = true
        }else{
            this.idPersonaje1 = utils.random(1, this.paginacion.count)
            this.idPersonaje2 = utils.random(1, this.paginacion.count)
            this.obtieneEpisodios()
            this.obtienePersonajesInteresantes()
            this.isLink = false
        }
    },
    methods: {
        ...mapActions(['offProgress', 'onProgress', 'setSnackBar']),
        async obtieneEpisodios(){
            if(this.personajeSeleccionado.episode){
                this.cargandoEpisodios = true
                for(let i in await this.personajeSeleccionado.episode){
                    this.obtieneInformacionEpisodio(this.personajeSeleccionado.episode[i])
                }
                setTimeout(() => {
                    this.cargandoEpisodios = false    
                }, 1000);
            }
        },
        obtieneInformacionEpisodio(url){
            apiService
            .getURL(url)
            .then(response => {
                let episodio = response.data
                this.episodios = this.episodios.concat({
                    id: episodio.id,
                    name: episodio.name,
                    episode: episodio.episode,
                    air_date: episodio.air_date
                })
            })
            .catch(error=>{
            })
        },
        obtienePersonajesInteresantes(){
            let service = `character/${this.idPersonaje1},${this.idPersonaje2}`
            apiService
            .get(service)
            .then(response=>{
                this.personajesInteresantes = response.data
            })
            .catch(error=>{

            })
        },
        obtienePersonaje(id){
            this.onProgress()
            let service = `character/${id}`
            apiService
            .get(service)
            .then(response=>{
                this.offProgress()
                this.personajeSeleccionado = response.data
                this.obtieneEpisodios()
                this.obtienePersonajesInteresantes()
            })
            .catch(error=>{
                this.this.offProgress()
                this.$router.push({name: 'main' })
            })
        },
        limpiaVariables(){
            this.personajeSeleccionado = this.personajeProp,
            this.episodios = [],
            this.personajesInteresantes = []
        },
        compartirPersonaje(){
            let enlaceCopia = `${this.linkAplicacion}detallePersonaje/${this.personajeProp.id}/${this.idPersonaje1}/${this.idPersonaje2}`
            navigator.clipboard.writeText(enlaceCopia)
            .then(() => {
                console.log("Enlace copiado")
            })
            .catch(err => {
                console.log('Error ', err);
            })
        }
    },
}
</script>