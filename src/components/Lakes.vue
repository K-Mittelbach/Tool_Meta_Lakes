<template>
  <v-data-table
    :headers="headers"
    :items="lakes"
    sort-by="name"
    class="--text display-2 "
  >
    <template v-slot:top>
      <v-toolbar
        flat
              >
        <v-toolbar-title>
          <h2>LAKES</h2>
          </v-toolbar-title>
        
        <v-spacer>
        </v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add Lake
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Lake name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.latitude"
                      label="Latitude"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.longitude"
                      label="Longitude"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.maxDepth"
                      label="MaxDepth"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.surfaceLevel"
                      label="SurfaceLevel"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.catchmentArea"
                      label="CatchmentArea"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.countries"
                      label="Country"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
<template v-slot:item.reviewed="{ }" >
 <v-checkbox
              v-model="ex4"
              
              color="blue"
              value="red"
              
              hide-details
            ></v-checkbox>
</template>
<template v-slot:item.edited="{ }" >
 <v-checkbox
              v-model="ex4"
              
              color="indigo"
              value="false"
              
              hide-details
            ></v-checkbox>
</template>
    <template v-slot:item.edit="{ item }">
      <v-icon
        lg
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
     <template v-slot:item.delete="{ item }">
      <v-icon
        lg
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

 <script>
 import gql from "graphql-tag";

const GET_LAKES=gql`
query getLakes{
  Lakes{
        Same,
        Latitude,
        Longitude,
        MaxDepth,
        SurfaceArea,
        SurfaceLevel,
        CatchmentArea,
        Countries
  }
}
`;

 const ADD_LAKE = gql`
  mutation addLake(
    $Name: String!
    $Latitude: Numeric!
    $Longitude: Numeric!
    $MaxDepth: Numeric!
    $SurfaceLevel: Numeric!
    $SurfaceArea: Numeric!
    $CatchmentArea: Numeric!
    $Country: String!
  )  {
    add_lakes(
      objects:[
        {
          Name: $Name
          Latitude: $Latitude
          Longitude:  $Longitude
          MaxDepth:  $MaxDepth
          SurfaceLevel: $SurfaceLevel
          SurfaceArea:  $SurfaceArea
          CatchmentArea:  $CatchmentArea
          Country: $Country
        }
      ]
    )
  }{
    returning{
      Id
    }
  }
 `;
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
          class: "--text subtitle-1"
        },
        { text: 'Latitude', value: 'latitude', class: " --text subtitle-1" },
        { text: 'Longitude', value: 'longitude', class: "--text subtitle-1" },
        { text: 'MaxDepth', value: 'maxDepth', class: "--text subtitle-1" },
        { text: 'SurfaceLevel', value: 'surfaceLevel', class: "--text subtitle-1" },
        { text: 'SurfaceArea', value: 'surfaceArea' , class: "--text subtitle-1"},
        { text: 'CatchmentArea', value: 'catchmentArea' ,class: "--text subtitle-1"},
        { text: 'Country', value: 'countries', sortable: false, class: "--text subtitle-1" },
        { text: 'IsReviewed', value: 'reviewed', sortable: false, class: "--text subtitle-1" },
        { text: 'IsEdited', value: 'edited', sortable: false, class: "--text subtitle-1" },
        { text: 'Edit', value: 'edit', sortable: false, class: "--text subtitle-1" },
        { text: 'Delete', value: 'delete', sortable: false, class: "--text subtitle-1" },
      ],
      lakes: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        latitude: 0,
        longitude: 0,
        maxDepth: 0,
        surfaceArea: 0,
        surfaceLevel: 0,
        catchmentArea: 0,
        countries: ' ',
      },
      defaultItem: {
        name: '',
        latitude: 0,
        longitude: 0,
        maxDepth: 0,
        surfaceArea: 0,
        surfaceLevel: 0,
        catchmentArea: 0,
        countries: ' ',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Lake' : 'Edit Lake'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },
    apollo:{
      lakes:{
        query: GET_LAKES 
      }
    },
    methods: {
      initialize () {
        this.lakes = [
          {
            name: 'A',
            longitude: -75.424734,
            latitude:  83.000368,
            countries: "CA",
          },
          {
            name: 'Ahvenainen',
            longitude:28.125358,
            latitude: 60.826345,
            countries: "FI",
          },
          {
            name: 'Albano',
            longitude: 12.6695080233,
            latitude: 41.7461118276999,
            countries: "IT",
          },
          {
            name: 'Alimmainen Savijärvi',
            longitude: 24.4016080769999,
            latitude: 61.7442196149999,
            countries: "FI",
          },
          {
            name: 'Big Round Lake',
            longitude: -68.8548436608,
            latitude: 69.8647630978999,
            maxDepth: 36.3,
            surfaceLevel: 180,
            surfaceArea: 1300000,
            countries: "CA",
          },
          {
            name: 'Blue Lake',
            longitude: -150.465176157999,
            latitude: 68.0870134782,
            maxDepth: 4,
            surfaceLevel: 1275,
            surfaceArea:  40000,
            catchmentArea: 4100000,
            countries: "US",
          },
          {
            name: 'C2',
            longitude: -77.985993,
            latitude: 82.827593,
            maxDepth: 84,
            surfaceArea: 1800000,
            catchmentArea: 21000000,
            countries: "CA",
          },
          {
            name: 'Donard',
            longitude:-61.7874877005,
            latitude: 66.6625264044999,
            maxDepth: 22,
            countries: "CA",
          },
          {
            name: 'Gyltigesjön',
            longitude: 13.175415,
            latitude: 56.756687,
            maxDepth: 20,
            surfaceLevel: 66,
            surfaceArea: 400000,
            catchmentArea:182000000,
            countries: "SE",
          },
          {
            name: 'Steel Lake',
            longitude: -94.6834010032,
            latitude: 46.9729734973,
            maxDepth: 21,
            surfaceLevel:  415.4,
            surfaceArea: 230000,
            catchmentArea: 1080000,
            countries: "US",
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.lakes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.lakes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.lakes.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.lakes[this.editedIndex], this.editedItem)
        } else {
          this.lakes.push(this.editedItem)
          //ADDLAKE_GRAPHQL
          const {name,latitude,longitude,maxDepth,surfaceArea,surfaceLevel,catchmentArea,countries} = this.editItem;
          this.$apollo.mutate({
            mutation: ADD_LAKE,
            variables:{
              name,
              latitude,
              longitude,
              maxDepth,
              surfaceArea,
              surfaceLevel,
              catchmentArea,
              countries
            },
            refetchQueries: ["getLakes"]
          });
        }
        this.close()
      },
    },
  }
</script>

