<template>
    <div class="input-text-icon mt-5">
        <input  type="text" 
                name="buscar"  
                :placeholder="label"
                class="text-busqueda"
                v-model="valorBusqueda"
                @keydown.enter="onClick(valorBusqueda)"
        >
        <v-icon class="icon" color="white">{{icon}}</v-icon>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    data() {
        return {
            valorBusqueda: ''
        }
    },
    props:{
        label: {
            type: String,
            default: ''
        },
        icon:{
            type: String,
            default: ''
        },
        onClick: Function
    },
    methods: {
        limpiaTextoBusqueda(){
            this.valorBusqueda = ''
        }
    },
}
</script>