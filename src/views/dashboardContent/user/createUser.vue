<template>
  <v-col cols="12">
    <v-card flat>
      <v-toolbar color="white" flat>
        <v-toolbar-title class="text--black">Tambah Pengguna</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Nama Pengguna"
            name="username"
            prepend-icon="mdi-account"
            type="text"
            v-model="username"
          />

          <v-text-field
            id="fullname"
            label="Nama Lengkap"
            name="fullname"
            prepend-icon="mdi-account-box"
            type="text"
            v-model="fullname"
          />

          <v-text-field
            id="password"
            label="Kata Sandi"
            name="password"
            prepend-icon="mdi-lock-open"
            type="password"
            v-model="password"
          />

          <v-text-field
            id="confirmPassword"
            label="Konfirmasi Kata Sandi"
            name="confirmPassword"
            prepend-icon="mdi-lock"
            type="password"
            v-model="confirmpassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="doAddUser">Tambah Pengguna</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { USER_CREATE } from '@/graphql/mutations/User'
import { GET_USER_LIST } from '@/graphql/queries/User'

export default {
  props: {
    source: String
  },
  data: () => ({
    userId: 0,
    username: '',
    confirmpassword: '',
    password: '',
    fullname: ''
  }),
  methods: {
    doAddUser () {
      let payload = {
        username: this.username,
        fullName: this.fullname,
        confirmPassword: this.confirmpassword,
        password: this.password
      }

      this.$apollo.mutate({
        mutation: USER_CREATE,
        variables: {
          username: payload.username,
          fullName: payload.fullName,
          confirmPassword: payload.confirmPassword,
          password: payload.password
        },
        refetchQueries: [
          { query: GET_USER_LIST }
        ]
      }).then(this.$router.push({ name: 'users' }))
    }
  }
}
</script>
