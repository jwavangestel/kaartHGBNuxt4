export default {
    getGeoServer(laag) {
        const wateren_pkl = fetch("http://yann216.nl:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:wateren&version=2.0.0&outputformat=application/json&request=GetFeature")
//          const data =  wateren_pkl.json();
//          const wateren = data;
          return wateren_pkl
    }
}