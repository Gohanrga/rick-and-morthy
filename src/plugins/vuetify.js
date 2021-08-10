import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#36c759',
                secondary: '#f2f2f2',
                tertiary: '#14555f',
                textField: '#081f33'
            }
        }
    }
});
