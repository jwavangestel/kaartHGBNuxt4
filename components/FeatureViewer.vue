<template>
    <div class="grid grid-cols-12">
        <div class="col-start-2 and col-end-12">
          <div class="ring-offset-2 ring-2 ring-gray-300 rounded">
            <div  v-if="feature !== null" >
            
              <dl class="divide-y divide-gray-300">
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Gemeente</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{  feature.properties.oat_gemeente }}</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Topniem</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ feature.properties.oat_gehucht }}</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Perceel</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ feature.properties.perceel }}</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Eigenaar</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{  feature.properties.oat_voornaam  }} {{  feature.properties.oat_tussenvoegsel  }} {{  feature.properties.oat_naam_eigenaar }}</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Woonplaats</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{  feature.properties.oat_woonplaats  }}</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Beroep</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{  feature.properties.oat_beroep  }}</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Oppervlakte</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {{  feature.properties.oat_bunder  }} bunder,</dd>
                  <dt class="text-sm font-medium leading-6 text-gray-900"></dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {{  feature.properties.oat_roede  }} roede,</dd>
                  <dt class="text-sm font-medium leading-6 text-gray-900"></dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {{  feature.properties.oat_ellen  }} ellen</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Klasse</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {{  feature.properties.oat_klasse  }}</dd>
                </div>
                <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Perceeltype</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {{  feature.properties.oat_omschrijving }}{{  feature.properties.oat_bebouwing }}</dd>
                </div>
              </dl>
            </div>
            <div v-if="feature === null">
              <div><b>Welkom op de site Historische Geografie Veldhoven</b></div>
              <div>De basis van het Nederlandse kadaster is in werking gesteld 1832.
                    De kaarten die door de landmeter getekend zijn heten minuutplans en de beschrijving van alle percelen heet ‘Oorspronkelijke Aanwijzende Tafel’ (O.A.T.). 
              <br><br> 
              <div>Deze percelen zijn door medewerkers van EGHV gedigitaliseerd samengekoppeld en interactief gemaakt.</div>
              <br>
              <div>Door op een ingekleurd perceel te klikken worden minimaal de kadastrale gemeente, het gehucht (toponiem), de eigenaar, beroep, soort eigendom, belastinggegevens (klasse) en de bestemming getoond. </div>
            </div>
          </div>
        </div>
    </div>
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