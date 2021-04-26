<template>
  <v-data-table
    :headers="headers"
    :items="Lakes"
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
                      v-model="editedItem.surfaceArea"
                      label="SurfaceArea"
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
<template v-slot:item.isReviewed="{ }" >
 <v-checkbox
              
              
              color="blue"
              value="red"
              
              hide-details
            ></v-checkbox>
</template>
<template v-slot:item.isEdited="{ }" >
 <v-checkbox
             
              
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
        { text: 'Countries', value: 'countries', sortable: false, class: "--text subtitle-1" },
        { text: 'IsReviewed', value: 'isReviewed', sortable: false, class: "--text subtitle-1" },
        { text: 'IsEdited', value: 'isEdited', sortable: false, class: "--text subtitle-1" },
        { text: 'Edit', value: 'edit', sortable: false, class: "--text subtitle-1" },
        { text: 'Delete', value: 'delete', sortable: false, class: "--text subtitle-1" },
      ],
      lakes: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        latitude: '',
        longitude: '',
        maxDepth: '',
        surfaceArea: '',
        surfaceLevel: '',
        catchmentArea: '',
        countries: ' ',
        isReviewed: false,
        isEdited: false
      },
      defaultItem: {
        name: '',
        latitude: '',
        longitude: '',
        maxDepth: '',
        surfaceArea: '',
        surfaceLevel: '',
        catchmentArea: '',
        countries: ' ',
        isEdited: false,
        isReviewed: false
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
    apollo:{
      Lakes: gql`
      query{
        Lakes{
          id,
          name,
          longitude,
          latitude,
          maxDepth,
          surfaceLevel,
          surfaceArea,
          catchmentArea,
          countries,
          isEdited,
          isReviewed,
        }
      }`,
    },

    created () {
      this.initialize()
    },
    
    methods: {
      initialize () {
        this.lakes = this.Lakes
      },

      editItem (item) {
        this.editedIndex = this.Lakes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.Lakes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        
   
      },

      deleteItemConfirm () {
        this.Lakes.splice(this.editedIndex, 1)
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
        console.log("closeDelete")
        var LakeID = this.editedItem.id;

        this.$apollo.mutate({
          mutation: gql`
          mutation($id: ID!)
          {
            deleteLake(
              id: $id
            )
            {
              name
            }
          }`,
          variables:{
           id: LakeID,
          }
        })

      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.Lakes[this.editedIndex], this.editedItem)
          //Update Mutation this.editedItem
           let {id,name,latitude,longitude,maxDepth,surfaceArea,surfaceLevel,catchmentArea,countries,isEdited,isReviewed} = this.Lakes[this.editedIndex];
            this.$apollo.mutate({
            mutation: gql`
            mutation($id: ID!
                      $name: String!,
                      $latitude: String,
                      $longitude: String,
                      $maxDepth: String,
                      $surfaceLevel: String,
                      $surfaceArea: String,
                      $catchmentArea: String,
                      $countries: String,
                      $isReviewed: Boolean,
                      $isEdited: Boolean)
            {
            updateLake(
                id: $id,
                name: $name,
                latitude: $latitude,
                longitude:  $longitude,
                maxDepth:  $maxDepth,
                surfaceLevel: $surfaceLevel,
                surfaceArea:  $surfaceArea,
                catchmentArea:  $catchmentArea,
                countries: $countries,
                isEdited: $isEdited,
                isReviewed: $isReviewed
                ) 
                {
              id
            }
           }`,
            variables:{
              id,
              name,
              latitude,
              longitude,
              maxDepth,
              surfaceLevel,
              surfaceArea,
              catchmentArea,
              countries,
              isEdited,
              isReviewed
            },
          });
        } else {
          this.Lakes.push(this.editedItem)
          var {name,latitude,longitude,maxDepth,surfaceArea,surfaceLevel,catchmentArea,countries,isEdited,isReviewed} = this.Lakes[this.Lakes.length -1 ];
          //Mutation 
           this.$apollo.mutate({
            mutation: gql`
            mutation( $name: String!,
                      $latitude: String,
                      $longitude: String,
                      $maxDepth: String,
                      $surfaceLevel: String,
                      $surfaceArea: String,
                      $catchmentArea: String,
                      $countries: String,
                      $isReviewed: Boolean,
                      $isEdited: Boolean)
            {
            post(
                name: $name,
                latitude: $latitude,
                longitude:  $longitude,
                maxDepth:  $maxDepth,
                surfaceLevel: $surfaceLevel,
                surfaceArea:  $surfaceArea,
                catchmentArea:  $catchmentArea,
                countries: $countries,
                isEdited: $isEdited,
                isReviewed: $isReviewed
                ) 
                {
              id
            }
           }`,
            variables:{
              name,
              latitude,
              longitude,
              maxDepth,
              surfaceLevel,
              surfaceArea,
              catchmentArea,
              countries,
              isEdited,
              isReviewed
            },
          });
          
         
        }
        this.close()
      },
    },
  }
</script>

