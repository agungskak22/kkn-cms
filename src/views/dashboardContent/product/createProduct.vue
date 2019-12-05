<template>
  <v-col cols="12">
    <v-card flat>
      <v-toolbar color="indigo" dark flat>
        <v-toolbar-title>Pengelolaan Informasi Penduduk</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Nama Pemilik"
              name="title"
              prepend-icon="mdi-clipboard-account-outline"
              type="text"
              v-model="ownerName"
            />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="birthday"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="setAt"
                  label="Tanggal Lahir"
                  prepend-icon="mdi-calendar-month-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="setAt" @input="birthday = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Tempat Lahir" prepend-icon="mdi-lock" v-model="birthplace"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="amber" @click="$router.push({ name: 'animal-management' })" dark elevation="0">{{ btnName }}</v-btn>
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
    productIndex: null,
    fileUploading: false,
    btnName: 'Tambah Pengguna',
    date: null,
    birthday: false,
    ownerName: '',
    birthplace: '',
    setAt: new Date().toISOString().substr(0, 10)

  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  }
}
</script>
