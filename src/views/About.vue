<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-card class="card-spaces">
            <v-sheet
              class="v-sheet--offset"
              color="#11B7CB"
              elevation="3"
              height="75px"
              dark
              style="margin-left:30px"
              width="80px"
            >
            <v-container
                class="fill-height"
                fluid
              >
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-col class="text-center">
                    <v-icon x-large>mdi-account</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-3">Total User: <b class="font-weight-medium">{{ users.length }}</b></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="card-spaces">
            <v-sheet
              class="v-sheet--offset"
              color="#DA2063"
              elevation="3"
              height="75px"
              dark
              style="margin-left:30px"
              width="80px"
            >
            <v-container
                class="fill-height"
                fluid
              >
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-col class="text-center">
                    <v-icon x-large>mdi-azure</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-3">Total Produk: <b class="font-weight-medium">{{ products.length }}</b></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="card-spaces">
            <v-sheet
              class="v-sheet--offset"
              color="#4BA64F"
              elevation="3"
              height="75px"
              dark
              style="margin-left:30px"
              width="80px"
            >
            <v-container
                class="fill-height"
                fluid
              >
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-col class="text-center">
                    <v-icon x-large>mdi-webpack</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-3">Status Produk: <b class="font-weight-medium">{{ productStatuses.length }}</b></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="card-spaces">
            <v-sheet
              class="v-sheet--offset"
              color="#FE9A16"
              elevation="3"
              height="75px"
              dark
              style="margin-left:30px"
              width="80px"
            >
            <v-container
                class="fill-height"
                fluid
              >
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-col class="text-center">
                    <v-icon x-large>mdi-water-well</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-3">Total tipe Produk: <b class="font-weight-medium">{{ productTypes.length }}</b></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_PRODUCT_STATUS, GET_PRODUCT_TYPE, GET_PRODUCT_LIST } from '@/graphql/queries/Product'
import { GET_USER_LIST } from '@/graphql/queries/User'
import format from 'date-fns/format'
// @ is an alias to /src
export default {
  name: 'about',
  data: () => ({
    search: '',
    dialog: false,
    editedIndex: -1,
    products: [],
    users: [],
    productTypes: [],
    productStatuses: []
  }),
  components: {

  },
  methods: {
    formatDate (data) {
      return format(data, 'DD MMMM YYYY')
    }
  },
  apollo: {
    products: {
      query: GET_PRODUCT_LIST
    },
    productStatuses: {
      query: GET_PRODUCT_STATUS
    },
    productTypes: {
      query: GET_PRODUCT_TYPE
    },
    users: {
      query: GET_USER_LIST
    }

  }
}
</script>
<style scoped>
.v-sheet--offset {
    top: -24px;
    position: relative;
  }
.card-spaces{
  width:300;
  margin-top:2em
}
.datatable-cell-wrapper {
  width: inherit;
  position: relative;
  z-index: 4;
  padding: 10px 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
  }
</style>
