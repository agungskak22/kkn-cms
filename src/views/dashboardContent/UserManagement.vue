<template>
  <div>
    <v-toolbar dark prominent src='https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'>
      <v-toolbar-title>Pengelolaan Data Pengguna</v-toolbar-title>
    </v-toolbar>
    <v-toolbar flat color='white'>
      <v-text-field
        flat
        solo
        prepend-icon='mdi-magnify'
        placeholder='Type something'
        v-model='search'
        hide-details
        class='hidden-sm-and-down'
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({ name: 'create-user' })">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table
      :search='search'
      :headers='headers'
      :items='userData'
      sort-by='email'
      class='elevation-1'
    >
      <template v-slot:item.status='{ item }'>
        <v-chip :color='getColor(item.status)' dark>{{ item.status }}</v-chip>
      </template>
      <template v-slot:top></template>
      <template v-slot:item.action='{ item }'>
        <v-icon small class='mr-2' @click='editItem(item)'>mdi-pen</v-icon>
        <v-icon small class='mr-2' @click='deleteItem(item)'>mdi-delete</v-icon>
        <v-icon small class='mr-2' @click='deleteItem(item)'>mdi-eye</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Nama',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Email', value: 'email' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    userData: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      status: ''
    },
    defaultItem: {
      name: '',
      email: '',
      status: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1
        ? 'Data Pengguna baru'
        : 'Ubah Data Pengguna'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.userData = [
        {
          name: '',
          email: '',
          password: '',
          status: 'aktiv'
        }
      ]
    },
    getDataUser () {
      let config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + '/user'
      this.$http.get(uri, config).then(response => {
        this.userData = response.data.data
      })
    },
    getColor (status) {
      if (status === 'tidak aktiv') return 'red'
      else if (status === 'aktiv') return 'green'
    },

    editItem (item) {
      this.editedIndex = this.userData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.userData.indexOf(item)
      confirm('Mau Hapus Pengguna ini?') && this.userData.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.userData[this.editedIndex], this.editedItem)
      } else {
        this.userData.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
</style>
