<template>
<div>
  <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title>Pengelolaan Data Pengguna</v-toolbar-title>

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

      <v-dialog v-model='dialog' max-width='500px'>
          <template v-slot:activator='{ on }'>
            <v-btn icon>
              <v-icon v-on='on'>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class='headline'>{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.name' label='Name'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.email' label='email'></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='4'>
                    <v-text-field v-model='editedItem.password' label='password'></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color='blue darken-1' text @click='close'>Cancel</v-btn>
              <v-btn color='blue darken-1' text @click='save'>Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>
  <v-data-table :search="search" :headers='headers' :items='userData' sort-by='email' class='elevation-1'>
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:top>
    </template>
    <template v-slot:item.action='{ item }'>
      <v-icon small class='mr-2' @click='editItem(item)'>mdi-pen</v-icon>
      <v-icon small @click='deleteItem(item)'>mdi-delete</v-icon>
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
      return this.editedIndex === -1 ? 'Data Pengguna baru' : 'Ubah Data Pengguna'
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
          name: 'Agung Prio Rismawan',
          email: 'agungskak22@gmail.com',
          password: 'password',
          status: 'aktiv'
        },
        {
          name: 'tomi rafael',
          email: 'agungskak22@gmail.com',
          password: 'password',
          status: 'tidak aktiv'
        },
        {
          name: 'tomi Bangsat',
          email: 'agungskak22@gmail.com',
          password: 'password',
          status: 'aktiv'
        }
      ]
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
