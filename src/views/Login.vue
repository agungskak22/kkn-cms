<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="10"
            md="5"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="indigo"
                dark
                flat
              >
                <v-toolbar-title>Masuk ke JDIH Admin</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Nama Pengguna"
                    prepend-icon="fas fa-user"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Kata Sandi"
                    v-model="password"
                    prepend-icon="fa fa-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  style="color:white"
                  color="indigo"
                  :loading="loading"
                  :disabled="loading"
                  @click="doLogin"
                >Masuk</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar
        v-model="snackbar"
        :vertical="vertical"
      >
        {{ text }}
        <v-btn
          color="indigo"
          text
          @click="snackbar = false"
        >
          Tutup
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { USER_LOGIN } from '@/graphql/mutations/User'

export default {
  name: 'login',
  props: {
    source: String
  },
  data: () => ({
    password: '',
    username: '',
    drawer: null,
    loader: null,
    loading: false,
    snackbar: false,
    text: 'Nama pengguna/kata sandi salah',
    vertical: true
  }),
  methods: {
    ...mapActions({
      mapLogin: 'User/doLogin'
    }),
    async doLogin () {
      let payload = {
        username: this.username,
        password: this.password
      }

      let response = null
      try {
        response = await this.$apollo.mutate({
          mutation: USER_LOGIN,
          variables: {
            username: payload.username,
            password: payload.password
          }
        })
      } catch (error) {
        this.snackbar = true
        this.text = error.message
      } finally {
        // commit disini
        sessionStorage.setItem('jdih-token', response.data.authenticate)
        this.$router.push({
          name: 'home'
        })
      }
    }
  },
  computed: {
  }
}
</script>
