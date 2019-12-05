<template>
  <v-col cols="12">
    <v-card flat>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Pengelolaan Produk</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Judul"
              name="title"
              prepend-icon="mdi-clipboard-account-outline"
              type="text"
              v-model="about"
            />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menuSetAt"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="setAt"
                  label="Tanggal Ditetapkan"
                  prepend-icon="mdi-calendar-month-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="setAt" @input="menuSetAt = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menuLegislatedAt"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="legislatedAt"
                  label="Tanggal Diundangkan"
                  prepend-icon="mdi-calendar-month-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="legislatedAt" @input="menuLegislatedAt = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Tahun"
              name="year"
              prepend-icon="mdi-clipboard-account-outline"
              type="number"
              v-model="year"
            />
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-select
              id="Status"
              :items="productStatuses"
              label="Status"
              name="status"
              prepend-icon="mdi-lock"
              types="null"
              item-text="name"
              item-value="productStatuses.id"
              v-model="statusSelected"
              return-object
            />
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-select
              id="productTypes"
              label="Jenis"
              name="type"
              prepend-icon="mdi-lock"
              v-model="typeSelected"
              item-value="productTypes.id"
              types="null"
              item-text="name"
              :items="productTypes"
              return-object
            />
          </v-col>

          <v-col cols="12">
            <v-file-input
              accept="image/png, image/jpeg, image/bmp, application/pdf, application/pdf"
              placeholder="PDF/docx"
              prepend-icon="mdi-paperclip"
              label="Berkas"
              show-size
              counter
              multiple
              @change="processFile"
            ></v-file-input>
              <v-card
                v-if="fileUploading"
                max-width="255"
                style="margin-left:1em"
                outlined
              >
                <v-card-text>
                  Mengunggah berkas...
                </v-card-text>
              </v-card>
              <v-card max-width="255" style="margin-left:1em" outlined v-if="(files.length !== 0 && files[0].url !== undefined)">
                <v-card-title class="subtitle" style="margin-left:1em;margin-right:1em">{{ files[0].fileName }}</v-card-title>
                <v-card-actions>
                  <v-btn
                    color="red"
                    text
                    small
                    @click="handleDeleteFile(files[0])"
                  >
                    Hapus
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    :href="files[0].url"
                    target="_blank"
                    text
                    small
                  >
                    Unduh
                  </v-btn>
                </v-card-actions>
              </v-card>
          </v-col>
          <v-col cols="12">
            <v-textarea label="Deskripsi" rows="4" prepend-icon="mdi-lock" v-model="description" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" :disabled="fileUploading" @click="doAddProduct">{{ btnName }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { GET_PRODUCT_STATUS, GET_PRODUCT, GET_PRODUCT_TYPE, GET_PRODUCT_LIST } from '@/graphql/queries/Product'
import { PRODUCT_CREATE, PRODUCT_EDIT } from '@/graphql/mutations/Product'
import format from 'date-fns/format'

export default {
  props: {
    source: String
  },
  data: () => ({
    rules: [
      value =>
        !value || value.size < 10000000 || 'Ukuran file tidak boleh lebih dari 10MB'
    ],
    productIndex: null,
    fileUploading: false,
    btnName: 'Tambah Produk Hukum',
    date: null,
    menu: false,
    menuLegislatedAt: false,
    menuSetAt: false,
    about: '',
    description: '',
    legislatedAt: new Date().toISOString().substr(0, 10),
    setAt: new Date().toISOString().substr(0, 10),
    typeSelected: { name: 'Peraturan Daerah', id: 1, __typename: 'ProductType' },
    productTypes: [{ name: 'peraturan daerah', id: 1, __typename: 'ProductType' }, { name: 'Peraturan kedua', id: 2, __typename: 'ProductType' }, { name: 'Keputusan Bupati', id: 3, __typename: 'ProductType' }],
    typeId: -1,
    statusId: -1,
    year: '',
    files: [],
    statusSelected: { name: 'Berlaku', id: 1, __typename: 'ProductStatus' },
    productStatuses: [[{ name: 'Berlaku', id: 1, __typename: 'ProductStatus' }, { name: 'Tidak Berlaku', id: 2, __typename: 'ProductStatus' }]]
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  async mounted () {
    this.productIndex = this.$route.params.id
    if (this.productIndex) {
      let response = await this.$apollo.query({
        query: GET_PRODUCT,
        variables: {
          id: this.productIndex
        }
      })
      let product = response.data.product

      if (product) {
        this.productIndex = product.id
        this.btnName = 'Perbarui Produk Hukum'
        this.about = product.about
        this.description = product.description
        this.id = product.id
        this.setAt = format(product.setAt, 'YYYY-MM-DD')
        this.legislatedAt = format(product.legislatedAt, 'YYYY-MM-DD')
        this.typeId = product.type.id
        this.typeSelected = product.type
        this.statusId = product.status.id
        this.statusSelected = product.status
        this.year = product.year
        this.files = product.files
      } else {
        this.productIndex = null
        this.fileUploading = false
        this.btnName = 'Tambah Produk Hukum'
        this.date = null
        this.menu = false
        this.menuLegislatedAt = false
        this.menuSetAt = false
        this.about = ''
        this.description = ''
        this.legislatedAt = new Date().toISOString().substr(0, 10)
        this.setAt = new Date().toISOString().substr(0, 10)
        this.typeSelected = { name: 'Peraturan Daerah', id: 1, __typename: 'ProductType' }
        this.productTypes = [{ name: 'peraturan daerah', id: 1, __typename: 'ProductType' }, { name: 'Peraturan kedua', id: 2, __typename: 'ProductType' }, { name: 'Keputusan Bupati', id: 3, __typename: 'ProductType' }]
        this.typeId = -1
        this.statusId = -1
        this.year = ''
        this.files = []
        this.statusSelected = { name: 'Berlaku', id: 1, __typename: 'ProductStatus' }
        this.productStatuses = [[{ name: 'Berlaku', id: 1, __typename: 'ProductStatus' }, { name: 'Tidak Berlaku', id: 2, __typename: 'ProductStatus' }]]
      }
    }
  },
  methods: {
    async doAddProduct () {
      if (!this.files.length) {
        alert('Mohon mengisi berkas terlebih dahulu')
        return
      }

      if (this.productIndex) {
        try {
          await this.$apollo.mutate({
            mutation: PRODUCT_EDIT,
            variables: {
              id: this.productIndex,
              year: this.year,
              setAt: this.setAt,
              legislatedAt: this.legislatedAt,
              typeId: this.typeSelected.id,
              statusId: this.statusSelected.id,
              files: [
                {
                  fileName: this.files[0].fileName,
                  mimeType: this.files[0].mimeType
                }
              ],
              description: this.description,
              about: this.about
            },
            refetchQueries: [
              { query: GET_PRODUCT_LIST }
            ]
          })
        } catch (error) {
          // do something
        } finally {
          this.$router.push({
            name: 'products'
          })
        }
      } else {
        try {
          await this.$apollo.mutate({
            mutation: PRODUCT_CREATE,
            variables: {
              year: this.year,
              setAt: this.setAt,
              legislatedAt: this.legislatedAt,
              typeId: this.typeSelected.id,
              statusId: this.statusSelected.id,
              files: [
                {
                  fileName: this.files[0].fileName,
                  mimeType: this.files[0].mimeType
                }
              ],
              description: this.description,
              about: this.about
            },
            refetchQueries: [
              { query: GET_PRODUCT_LIST }
            ]
          })
        } catch (error) {
          // do something
        } finally {
          this.$router.push({
            name: 'products'
          })
        }
      }
    },
    processFile (event) {
      if (event[0]) {
        let photo = event[0]
        let req = new XMLHttpRequest()
        let formData = new FormData()
        let superThis = this

        req.onprogress = function () { superThis.fileUploading = true }

        req.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            try {
              superThis.files[0] = JSON.parse(this.responseText)['data']
            } catch (error) {
              alert('Pengunggahan berkas gagal')
            }
          }
          superThis.fileUploading = false
        }

        formData.append('file', photo)
        req.open('POST', 'https://jdih-bulungan-api.dewadg.pro/files')
        req.send(formData)
      }
    },

    handleDeleteFile () {
      this.files = []
    },

    save (date) {
      this.$refs.menu.save(date)
    }
  },

  apollo: {
    productStatuses: {
      query: GET_PRODUCT_STATUS
    },
    productTypes: {
      query: GET_PRODUCT_TYPE
    }
  }
}
</script>
