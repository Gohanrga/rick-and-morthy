<script>
import {ApiService} from '../ApiService'
import {mapActions, mapState} from 'vuex';
const apiService = new ApiService();
export default {
    data() {
        return {
           
        }
    },
    computed:{
        ...mapState(['personajesFavoritos']),
    },
    methods: {
        ...mapActions(['offProgress', 'onProgress', 'setSnackBar', 'savePersonajes', 'savePaginacion', 'savePersonajeNoEncontrado']),
        obtienePersonajes(query){
            this.onProgress()
            const service = `character/${query}`
            apiService
            .get(service)
            .then(response=>{
                this.offProgress()
                this.savePersonajeNoEncontrado(false)
                this.guardaPersonajes(response.data.results)
                this.savePaginacion(response.data.info)
            })
            .catch(error=>{
                this.offProgress()
                this.savePersonajeNoEncontrado(true)
                this.savePersonajes([])
                this.savePaginacion([])
            })
        },
        guardaPersonajes(personajes){
            let seleccionados = (this.personajesFavoritos.map(data=>data.id)).toString()
            for(let personaje in personajes)
                personajes[personaje].favorite = seleccionados.indexOf(personajes[personaje].id)>=0 ? true : false
            
            this.savePersonajes(personajes)
        }
    },
}
</script>