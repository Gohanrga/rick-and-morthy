<template>
    <div class="card-text--info">
        <div class="card-text-title">
            <v-icon 
                v-if="icon!==''"
                small>{{icon}}
            </v-icon>
            <span v-if="textTitle!==''">
                {{textTitle}}
            </span>
        </div>
        <div v-if="infoText!==''">
            <h4>{{infoText}}</h4>
        </div>
        <div v-if="dateInfo!==''">
            <span>{{dateInfo}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        icon:{
            type: String,
            default: ''
        },
        textTitle: {
            type: String,
            default: ''
        },
        infoText: {
            type: String,
            default: ''
        },
        dateInfo: {
            type: String,
            default: ''
        }
    }
}
</script>