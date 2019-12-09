<template>
  <v-app id="keep">
    <v-app-bar app clipped-left color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5">
        KKN&nbsp;
        <span class="font-weight-light">Management Sistem</span>
      </span>

      <v-spacer />
      <v-menu open-on-hover top offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="doLogout()">
                Keluar
              </v-btn>
          </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>

          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="i" @click="$router.push({ name: item.to }).catch(err => {})" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import store from '../store'

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      {
        id: 1,
        icon: 'mdi-view-dashboard',
        text: 'Dasbor',
        to: 'home'
      },
      {
        id: 2,
        icon: 'mdi-account-multiple-outline',
        text: 'Pengelolaan Pengguna',
        to: 'users'
      },
      {
        id: 3,
        icon: 'mdi-azure',
        text: 'Pengelolaan rumah',
        to: 'products'
      }
    ]
  }),
  methods: {
    // getData(){
    //   let config = {
    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('token')
    //     }
    //   }
    // },
    doLogout () {
      localStorage.removeItem('token')
      store.commit('logoutUser')
      this.$router.push({ name: 'login' })
      console.log('token')
    }
  }
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
