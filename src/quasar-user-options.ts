
import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import {Notify, Loading, Dialog, BottomSheet} from 'quasar'
// To be used on app.use(Quasar, { ... })
export default {
  plugins: {
    Notify,
    Loading,
    Dialog,
    BottomSheet,
  },
  config: {
    brand: {
      primary: '#621aee',
      secondary: '#ffc702',
      accent: '#22d59b',

      dark: '#1d1d1d',

      positive: '#0059ff',
      negative: '#f01430',
      info: '#e2f1fe',
      warning: '#fceebb'
    },
    notify: { /* look at QuasarConfOptions from the API card */ },
    loading: { /* look at QuasarConfOptions from the API card */ },
    dialog:{},
    bottomSheet: {}
  },
}