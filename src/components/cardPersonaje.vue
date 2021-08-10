<template>
    <v-card
        class="mx-auto card-personaje"
        max-width="370"
        outlined
    >
        <div class="card-imagen">
            <v-img
                :src="personaje.image"
                max-height="157"
                max-width="157"
                class="card-personaje--img"
                @click="verPersonaje(personaje)"
            >
            </v-img>
            <BotonFavorito 
                    :favorito="personaje.favorite"
                    :onClick="marcaFavorito"
                    :id="personaje.id"
                    class="posicion-boton"/>
        </div>
        <v-card-text class="card-detalle ">
            <div class="status">
                <div class="circle"></div>
                {{personaje.status}} - {{personaje.species}}
            </div>
            <div class="ajuste-top"><h4>{{personaje.name}}</h4></div>
            <div class="detail">
                <div><span>Last known location:</span></div>
                <div class="ajuste-top">{{personaje.location.name}}</div>
            </div>
            <div class="detail">
                <div><span>First seen in:</span></div>
                <div class="ajuste-top">{{personaje.origin.name}}</div>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
import BotonFavorito from './botonFavorito.vue'
export default {
    components:{
        BotonFavorito
    },
    data() {
        return {
            
        }
    },
    props:{
        personaje: {
            type: Object,
            default: {}
        },
        marcaFavorito: {
            type: Function,
            default: ()=>{}
        },
        verPersonaje: {
            type: Function,
            default: ()=>{}
        }

    }
}
</script>