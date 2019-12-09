<template>
  <v-col cols='12'>
    <v-card flat>
      <v-toolbar color='white' flat>
        <v-toolbar-title class='text--black'>Tambah Pengguna</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label='Nama Pengguna'
            name='Name'
            prepend-icon='mdi-account'
            type='text'
            v-model='form.name'
          />

          <v-text-field
            id='email'
            label='Email'
            name='email'
            prepend-icon='mdi-account-box'
            type='text'
            v-model='form.email'
          />

          <v-text-field
            id='password'
            label='Kata Sandi'
            name='password'
            prepend-icon='mdi-lock-open'
            type='password'
            v-model='form.password'
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color='primary' @click="createUser()">Tambah Pengguna</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbarState.snackbar"
      :timeout="snackbarState.timeout"
    >
      {{ snackbarState.msg }}
      <v-btn
        color="blue"
        text
        @click="snackbarState.snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-col>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    form: {
      name: null,
      email: null,
      password: null
    },
    snackbarState: {
      snackbar: false,
      msg: 'berhasil Menambahkan',
      timeout: 2000
    }
  }),
  methods: {
    createUser () {
      let uri = this.$apiurl + '/user'
      this.$http.post(uri, this.form).then(response => {
        if (response.status === 201) {
          this.snackbarState.snackbar = true
          this.$router.push({ name: 'users' })
        } else {
          alert('error')
        }
      })
    }
  }
}
</script>
