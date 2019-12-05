<template>
<div>
  <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title>Pengelolaan Data Rumah</v-toolbar-title>

    </v-toolbar>
    <v-toolbar flat color="white">
      <v-text-field
        flat
        solo
        prepend-icon="mdi-magnify"
        placeholder="Type something"
        v-model="search"
        hide-details
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon
          v-on='on'
          @click="$router.push({ name: 'create-product' })"
          >mdi-plus-circle</v-icon>
        </v-btn>
    </v-toolbar>
  <v-data-table :search="search" :headers='headers' :items='userData' sort-by='birthplace' class='elevation-1'>
    <template v-slot:top>
    </template>
    <template v-slot:item.action='{ item }'>
      <v-icon small class='mr-2' @click='editItem(item)'>mdi-pen</v-icon>
      <v-icon small class='mr-2' @click='deleteItem(item)'>mdi-delete</v-icon>
      <v-icon small @click='deleteItem(item)'>mdi-eye</v-icon>
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
      { text: 'Nama Pemilik', value: 'Name' },
      { text: 'Tempat lahir', value: 'birthplace' },
      { text: 'Tanggal Lahir', value: 'birthday' },
      { text: 'Actions', value: 'action', sortable: false, align: 'center' }
    ],
    userData: [],
    editedIndex: -1,
    editedItem: {
      Name: '',
      birthplace: '',
      birthday: ''
    },
    defaultItem: {
      Name: '',
      birthplace: '',
      birthday: ''
    }
  }),

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
          Name: 'Agung Prio Rismawan',
          birthplace: 'agungskak22@gmail.com',
          birthday: '10 Desember 2019'
        },
        {
          Name: 'tomi rafael',
          birthplace: 'agungskak22@gmail.com',
          birthday: '10 Desember 2019'
        },
        {
          Name: 'tomi Bangsat',
          birthplace: 'agungskak22@gmail.com',
          birthday: '10 Desember 2019'
        }
      ]
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
