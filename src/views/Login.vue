<template>
  <v-app id='inspire'>
    <v-content>
      <v-container class='fill-height' fluid>
        <v-row align='center' justify='center'>
          <v-col cols='12' sm='10' md='5'>
            <v-card class='elevation-12'>
              <v-toolbar color='indigo' dark flat>
                <v-toolbar-title>Masuk ke JDIH Admin</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model='form.username'
                    label='Nama Pengguna'
                    prepend-icon='fas fa-user'
                    type='text'
                  ></v-text-field>

                  <v-text-field
                    label='Kata Sandi'
                    v-model='form.password'
                    prepend-icon='fa fa-lock'
                    type='password'
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  style='color:white'
                  color='indigo'
                  @click='login()'
                >Masuk</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar
        v-model='snackbar'
        :color='color'
        :multi-line='true'
        :timeout='3000'
      >
        {{ text }}
        <v-btn color='indigo' text @click='snackbar = false'>Tutup</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import store from '../store'

export default {
  name: 'login',
  props: {
    source: String
  },
  data: () => ({
    form: {
      username: null,
      password: null,
      client_id: 2,
      client_secret: 'kNIZ3gxtDFIsfialH37QVGImNUQWHp6bEAQdytJV',
      grant_type: 'password'
    },
    snackbar: false,
    color: null,
    text: ''
  }),
  methods: {
    login () {
      var uri = this.$apiLogin + '/token'
      this.$http
        .post(uri, this.form)
        .then(response => {
          if (response.data.access_token) {
            store.commit('loginUser')
            this.snackbar = true
            this.color = 'green'
            this.text = 'Berhasil Login'
            localStorage.setItem('token', response.data.access_token)
            this.$router.push({ name: 'home' })
          } else {
            this.snackbar = true
            this.color = 'red'
            this.text = 'Akun tidak terdaftar'
          }
        })
        .catch(error => {
          this.snackbar = true
          this.text = error.response.data.message
          this.color = 'red'
          this.load = false
        })
    }
  }
}
</script>
