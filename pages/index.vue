<template>
    <div class="grid grid-cols-12">
        <div class="col-start-4 and col-end-13">

            <div style="height:100vh">
                <LMap
                ref="map"
                :zoom="zoom"
                :center="[51.45322, 5.359482]"
                >
                <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                />

                <l-geo-json 
        :geojson="wateren"
        :options="waterenOptions"
        :options-style="waterenStyleFunction"
      />
      <l-geo-json 
        :geojson="bouw"
        :options="bouwOptions"
        :options-style="bouwStyleFunction"
      />

<!--       <l-geo-json
        :geojson="perceelgrens"
        :options="ptions"
        :options-style="perceelgrensStyleFunction"
      />
-->
      <l-geo-json 
        :geojson="perceel"
        :options="perceelOptions"
        :options-style="perceelStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_dennenbos"
        :options="perceel_dennenbosOptions"
        :options-style="perceelDennenbosStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_heide"
        :options="perceel_heideOptions"
        :options-style="perceelHeideStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_hakhout"
        :options="perceel_hakhoutOptions"
        :options-style="perceelHakhoutStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_boomgaard"
        :options="perceel_boomgaardOptions"
        :options-style="perceelBoomgaardStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_hooiland"
        :options="perceel_hooilandOptions"
        :options-style="perceelHooilandStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_kerkhof"
        :options="perceel_kerkhofOptions"
        :options-style="perceelKerkhofStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_tuin"
        :options="perceel_tuinOptions"
        :options-style="perceelTuinStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_weiland"
        :options="perceel_weilandOptions"
        :options-style="perceelWeilandStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_bebouwing"
        :options="perceel_bebouwingOptions"
        :options-style="perceelBebouwingStyleFunction"
      />

      <l-geo-json 
        :geojson="bouw"
        :options="bouwOptions"
        :options-style="bouwStyleFunction"
      />
                </LMap>
            </div>
        </div>
    </div>  
        
</template>

<script setup>
import { ref } from 'vue'
import 'leaflet/dist/leaflet.css'; 

import perceel from "./perceel.json"
  import perceel_dennenbos from "./perceel_dennenbos.json"
  import perceel_heide from "./perceel_heide.json"
  import perceel_hakhout from "./perceel_hakhout.json"
  import perceel_boomgaard from "./perceel_boomgaard.json"
  import perceel_hooiland from "./perceel_hooiland.json"
  import perceel_kerkhof from "./perceel_kerkhof.json"
  import perceel_tuin from "./perceel_tuin.json"
  import perceel_weiland from "./perceel_weiland.json"

const zoom = ref(12.48)

  
  const  perceelStyleFunction = {   fillColor: "#d1c40f",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

  const  perceelDennenbosStyleFunction = {   fillColor: "#31714c",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

  const  perceelHeideStyleFunction = {   fillColor: "#9152d5",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelBoomgaardStyleFunction = {   fillColor: "#e8c030",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelHakhoutStyleFunction = {   fillColor: "#72a35b",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelHooilandStyleFunction = {   fillColor: "#99995a",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelKerkhofStyleFunction = {   fillColor: "#d53ccd",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelTuinStyleFunction = {   fillColor: "#aa6e05",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelWeilandStyleFunction = {   fillColor: "#35ac10",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelBebouwingStyleFunction = {   fillColor: "#969696",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  waterenStyleFunction = {   fillColor: "#44afef",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}


    const  bouwStyleFunction = {   fillColor: "#460156",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

  



  const  perceelgrensStyleFunction = {color:  'black'}
  //const geojson = await fetch('http://localhost:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:bouw&version=2.0.0&outputformat=application/json&request=GetFeature').then(res => res.json)
  //const response = await fetch('http://localhost:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:wateren&version=2.0.0&outputformat=application/json&request=GetFeature')
  const wateren_pkl = await fetch("http://localhost:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:wateren&version=2.0.0&outputformat=application/json&request=GetFeature")
  const data = await wateren_pkl.json();
  const wateren = data;

  const bouw_pkl = await fetch("http://localhost:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:bouw&version=2.0.0&outputformat=application/json&request=GetFeature")
  const datab = await bouw_pkl.json();
  const bouw = datab;


</script>

<style lang="scss" scoped>

</style>