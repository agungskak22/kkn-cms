<template>
  <v-col cols='12'>
    <v-card flat>
      <v-toolbar color='indigo' dark flat>
        <v-toolbar-title>Tambah Data Hewan</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container>
        <div class='form'>
          <div v-for='(hewan, index) in arrayHewan' :key='index'>
            <v-container>
              <v-row>
                <v-col cols='12' sm='6' md='3'>
                  <v-text-field
                    label='ID Hewan'
                    name='title'
                    prepend-icon='mdi-clipboard-account-outline'
                    type='text'
                    v-model='hewan.name'
                  />
                </v-col>
                <v-col cols='12' sm='6' md>
                  <v-text-field label='Bobot' prepend-icon='mdi-lock' v-model='hewan.bobot'></v-text-field>
                </v-col>
                <v-col cols='12' sm='6' md='3'>
                  <v-select :items='hewan.jenisKelamin' label='Jenis Kelamin'></v-select>
                </v-col>
                <v-col cols='12' sm='6' md='3'>
                  <v-select :items='hewan.jenisTernak' label='Jenis Ternak'></v-select>
                </v-col>
                <v-col class="text-right" cols='12' sm='12' md='12'>
                  <v-btn
                    class='red darken-1'
                    elevation='1'
                    dark
                    v-if='canRemove'
                    v-on:click='removeTernak(index)'
                  >Hapus</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color='amber' v-on:click='addHewan' dark elevation='0'>{{ btnName }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    btnName: 'Tambah Hewan',
    arrayHewan: [
      {
        name: '',
        bobot: 0.0,
        jenisKelamin: ['Jantan', 'Betina'],
        jenisTernak: ['domba', 'ayam', 'sapi']
      }
    ]
  }),
  computed: {
    canRemove: function () {
      return this.arrayHewan.length > 1
    }
  },
  methods: {
    addHewan: function () {
      this.arrayHewan.push({
        name: '',
        bobot: 0.0,
        jenisKelamin: ['Jantan', 'Betina'],
        jenisTernak: ['domba', 'ayam', 'sapi']
      })
    },
    removeTernak: function (index) {
      if (index > -1) {
        this.arrayHewan.splice(index, 1)
      }
    }
  }
}
</script>
