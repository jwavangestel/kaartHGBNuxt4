<template>
  <div class="feature-table">

    <table class="feature-table">
      <thead>
        <tr>
          <th>

          </th>
          
        </tr>
      </thead>
      <tr>
        <th>
          Gemeente :
        </th>
        <td>
          {{  feature.properties.oat_gemeente }}
        </td>
      </tr>

      <tr>
        <th>
          Gehucht : 
        </th>
        <td>
          {{  feature.properties.oat_gehucht }}
        </td>
      </tr>

      <tr>
        <th>
          Perceel : 
        </th>
        <td>
          {{  feature.properties.perceel  }}
        </td>
      </tr>

      <tr>
        <th>
          Eigenaar :
        </th>
        <td>
          {{  feature.properties.oat_voornaam  }} {{  feature.properties.oat_tussenvoegsel  }} {{  feature.properties.oat_naam_eigenaar }}
        </td>
      </tr>

      <tr>
        <th>
          Beroep : 
        </th>
        <td>
          {{  feature.properties.oat_beroep  }}
        </td>
      </tr>

      <tr>
        <th>
          Woonplaats : 
        </th>
        <td>
          {{  feature.properties.oat_woonplaats  }}
        </td>
      </tr>

      <tr>
        <th>
          Oppervlakte : 
        </th>
        <td>
          {{  feature.properties.oat_bunder  }} bunder,
        </td>
      </tr>
      <tr>
        <th> 
        </th> 
        <td>
          {{  feature.properties.oat_roede  }} roede,
        </td>       
      </tr>
      <tr>
        <th> 
        </th> 
        <td>
          {{  feature.properties.oat_ellen  }} ellen 
        </td>       
      </tr>

      <tr>
        <th> 
          Klasse
        </th> 
        <td>
          {{  feature.properties.oat_klasse  }} ellen 
        </td>       
      </tr>

      <tr>
        <th> 
          Perceeltype
        </th> 
        <td>
          {{  feature.properties.oat_omschrijving }}{{  feature.properties.oat_bebouwing }} 
        </td>       
      </tr>

    </table>

  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue';
import { useFeatureStore } from "@/stores/featureStore";

const props = defineProps({
  feature: {
    type: Object,
    required: true,
  },
});

const properties = computed(() => {
 if ('properties' in props.feature) {
   return props.feature.properties;
  }
  return null;
});

const featureStore = useFeatureStore();

const close = (() => {
  featureStore.resetCurrentFeature();
});


</script>