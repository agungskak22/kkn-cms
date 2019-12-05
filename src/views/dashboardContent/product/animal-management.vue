<template>
  <v-col cols='12'>
    <v-card flat>
      <v-toolbar color='indigo' dark flat>
        <v-toolbar-title>Tambah Data Hewan</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container></v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color='amber'
          @click='$router.push({ name: "animal-management" })'
          dark
          elevation='0'
        >{{ btnName }}</v-btn>
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
