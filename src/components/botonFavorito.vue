<template>
    <v-btn
    class="mx-2"
    fab
    dark
    small
    :color="favorito ? colorBtnFavorito: colorBtnNoFavorito"
    @click="onClick(id)"
    elevation="1"
    >
        <v-icon :color="favorito?colorIconFavorito:colorIconNoFavorito">
            mdi-star
        </v-icon>
    </v-btn>
</template>
<script>
export default {
    data() {
        return {
            colorBtnFavorito: 'white',
            colorBtnNoFavorito: 'blue-grey lighten-5',
            colorIconFavorito: 'yellow',
            colorIconNoFavorito: 'blue-grey darken-2'
        }
    },
    props:{
        favorito:{
            type: Boolean,
            default: false
        },
        onClick: {
            type: Function,
            default: ()=>{}
        },
        id:{
            type: Number,
            default: 0
        }
    }
}
</script>