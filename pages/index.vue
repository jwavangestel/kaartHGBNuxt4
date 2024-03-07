<template>
  <header class="bg-white">
  <nav class="mx-auto flex max-w-10xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">Your Company</span>
        <img class="h-12 w-auto" src="https://www.erfgoedhuisveldhoven.nl/wp-content/uploads/2021/03/logo-157-51-1.png" alt="">
      </a>
    </div>

    <div class="hidden lg:flex lg:gap-x-12">

      <a href="https://erfgoedhuisveldhoven.nl" class="text-sm font-semibold leading-6 text-gray-900">Home</a>
 
    </div>

  </nav>

</header>
    <div class="grid grid-cols-12">
        <div class="col-start-1 and col-end-4">
          <feature-viewer  :feature="currentFeature" />

        </div>
        <div class="col-start-4 and col-end-12 ">
          <div class=" ring-2 ring-gray-500 rounded">
            <div style="height:75vh">
              <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">

                <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                />
                <l-geo-json 
                  :geojson="lijnen"
                  :options="geoJsonOptions"
                  :options-style="lijnenStyleFunction"
                />
                <l-geo-json 
                  :geojson="bebouwing"
                  :options="geoJsonOptions"
                  :options-style="perceelBebouwingStyleFunction"
                />
                <l-geo-json v-for="(data, type, index) in geoJsonData" :key="index"
                  :geojson="data"
                  :options="geoJsonOptions"
                  :options-style="getStyleOptionsFunction(type)"
                />
                <l-geo-json 
                  :geojson="wateren"
                  :options="geoJsonOptions"
                  :options-style="waterenStyleFunction"
                />
                <l-geo-json 
                  :geojson="bouwland"
                  :options="geoJsonOptions"
                  :options-style="perceelStyleFunction"v
                />
                <l-geo-json 
                  :geojson="dennenbos"
                  :options="geoJsonOptions"
                  :options-style="perceelDennenbosStyleFunction"
                />
                <l-geo-json 
                  :geojson="heide"
                  :options="geoJsonOptions"
                  :options-style="perceelHeideStyleFunction"
                />
                <l-geo-json 
                  :geojson="hakhout"
                  :options="geoJsonOptions"
                  :options-style="perceelHakhoutStyleFunction"
                />
                <l-geo-json 
                  :geojson="boomgaard"
                  :options="geoJsonOptions"
                  :options-style="perceelBoomgaardStyleFunction"
                />
                <l-geo-json 
                  :geojson="hooiland"
                  :options="geoJsonOptions"
                  :options-style="perceelHooilandStyleFunction"
                />
                <l-geo-json 
                  :geojson="kerkhof"
                  :options="geoJsonOptions"
                  :options-style="perceelKerkhofStyleFunction"
                />
                <l-geo-json 
                  :geojson="tuin"
                  :options="geoJsonOptions"
                  :options-style="perceelTuinStyleFunction"
                />
                <l-geo-json 
                  :geojson="weiland"
                  :options="geoJsonOptions"
                  :options-style="perceelWeilandStyleFunction"
          
                />


                <l-geo-json 
                  :geojson="bouw"
                  :options="geoJsonOptions"
                  :options-style="bouwStyleFunction"
                />
              </l-map>
            </div>
          </div>
        </div>
    </div>  
    <br>
    <div class=" ring-2 ring-gray-500 rounded bg-blue-950
    ">
        <div style="height:9.5vh ">
          <div class="text-indigo-400 text-xl text-center">
            <br>
          Erfgoedhuis Veldhoven
        </div>
        </div>
    </div>
            
</template>

<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet"
import { ref, onMounted, watch, computed } from 'vue'
import EventService from '@/services/EventService.js'

import { useFeatureStore } from "@/stores/featureStore";
import FeatureViewer from '@/components/FeatureViewer.vue';


const zoom = ref(12.62)
const center = ref([51.43122, 5.359482]);
const geoJsonData = ref({});


const defaultOptions = {
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

const fillColors = {
  weiland: '#35ac10',
  boomgaard: '#e8c030',
  bebouwing: '#d1c40f',
  dennenbos: '#31714c',
  hakhout: '#72a35b',
  hooiland: '#99995a',
  kerkhof: '#d53ccd',
  tuin: '#aa6e05',
  heide: '#9152d5',
  bouwland: '#d1c40f',
  wateren: '#44afef',
  bouw: '#460156',
};

const getGeoServer = (async (type) => {
  const response = await EventService.getGeoServer(type);
  console.log(response);
  return response.data;
});

const getStyleOptionsFunction = ((type) => {
  const styleOptions = { ...defaultOptions };
  if (type in fillColors) {
    styleOptions.fillColor = fillColors[type];
  }
  return () => {
    return styleOptions;
  };
});

const featureStore = useFeatureStore();

const currentFeature = computed(() => featureStore.currentFeature );

const layerClick = ((e) => {
  console.log('CLICK!!');
  console.log(e.target.feature);
  featureStore.setCurrentFeature(e.target.feature);
});

const onEachFeature = ((feature, layer) => {
  layer.on({
    click: layerClick,
  })
});

const geoJsonOptions = {
  onEachFeature,
};

//onMounted(async () => {

//  const promises = [];
//  const wateren_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:wateren&version=2.0.0&outputformat=application/json&request=GetFeature")
//  const data = await wateren_pkl.json();

//  promises.push(getGeoServer('bouw'));
//  promises.push(getGeoServer('wateren'));
//  promises.push(getGeoServer('perceel'));
//  promises.push(getGeoServerPerceel('weiland'));
//  promises.push(getGeoServerPerceel('boomgaard'));
//  promises.push(getGeoServerPerceel('bebouwing'));
//  promises.push(getGeoServerPerceel('dennenbos'));
//  promises.push(getGeoServerPerceel('hakhout'));
//  promises.push(getGeoServerPerceel('hooiland'));
//  promises.push(getGeoServerPerceel('kerkhof'));
//  promises.push(getGeoServerPerceel('tuin'));
//  promises.push(getGeoServerPerceel('heide'));
//  promises.push(getGeoServerPerceel('bouwland'));

//const [ bouw, wateren, perceel, weiland,boomgaard,bebouwing,dennenbos,hakhout,hooiland,kerkhof,tuin,heide,bouwland ] = await Promise.all(promises);


//  console.log(wateren);
//  geoJsonData.value = {
//    bouw,
//   wateren,
//    perceel,
//    weiland,
//    boomgaard,
//    bebouwing,
//    dennenbos,
//    hakhout,
//    hooiland,
//    kerkhof,
//    tuin,
//    heide,
//    bouwland,
//  };
//  console.log(geoJsonData.value);
//});

        const  perceelStyleFunction = {   fillColor: "#d1c40f",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

  const  perceelDennenbosStyleFunction = {   fillColor: "#31714c",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

  const  perceelHeideStyleFunction = {   fillColor: "#9152d5",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  perceelBoomgaardStyleFunction = {   fillColor: "#e8c030",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  perceelHakhoutStyleFunction = {   fillColor: "#72a35b",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  perceelHooilandStyleFunction = {   fillColor: "#99995a",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  perceelKerkhofStyleFunction = {   fillColor: "#d53ccd",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  perceelTuinStyleFunction = {   fillColor: "#aa6e05",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  perceelWeilandStyleFunction = {   fillColor: "#35ac10",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  perceelBebouwingStyleFunction = {   fillColor: "#969696",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

    const  waterenStyleFunction = {   fillColor: "#44afef",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}


    const  bouwStyleFunction = {   fillColor: "#460156",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6}

  



  const  lijnenStyleFunction = {color:  'black'}
  //const geojson = await fetch('http://localhost:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:bouw&version=2.0.0&outputformat=application/json&request=GetFeature').then(res => res.json)
  //const response = await fetch('http://localhost:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:wateren&version=2.0.0&outputformat=application/json&request=GetFeature')
  
  const lijnen_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eghv:Lijnen%20Veldhoven&outputFormat=application/json")
  const datal = await lijnen_pkl.json();
  const lijnen = datal;
  
  
  const wateren_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:wateren&version=2.0.0&outputformat=application/json&request=GetFeature")
  const data = await wateren_pkl.json();
  const wateren = data;

  const bouw_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:bouw&version=2.0.0&outputformat=application/json&request=GetFeature")
  const datab = await bouw_pkl.json();
  const bouw = datab;


  const weiland_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='weiland'")
  const dataw = await weiland_pkl.json();
  const weiland = dataw;


  const boomgaard_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='boomgaard'")
  const databoomgaard= await boomgaard_pkl.json();
  const boomgaard = databoomgaard;

  const bebouwing_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel")
  const databebouwing = await bebouwing_pkl.json();
  const bebouwing = databebouwing;

  const dennenbos_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='dennenbos'")
  const datadennenbos = await dennenbos_pkl.json();
  const dennenbos= datadennenbos;

  const hakhout_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='hakhout'")
  const datahakhout = await hakhout_pkl.json();
  const hakhout = datahakhout;

  const hooiland_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='hooiland'")
  const datahooiland = await hooiland_pkl.json();
  const hooiland = datahooiland;

  const kerkhof_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='kerkhof'")
  const datakerkhof = await kerkhof_pkl.json();
  const kerkhof = datakerkhof;

  const tuin_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='tuin'")
  const datatuin = await tuin_pkl.json();
  const tuin = datatuin;

  const heide_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='heide'")
  const dataheide = await heide_pkl.json();
  const heide = dataheide;

  const bouwland_pkl = await fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&version=2.0.0&request=GetFeature&outputformat=application/json&typenames=eghv:perceel&cql_filter=oat_omschrijving='bouwland'")
  const databouwland = await bouwland_pkl.json();
  const bouwland = databouwland;  

</script>

<style lang="scss" scoped>

</style>~/services/EventService.js