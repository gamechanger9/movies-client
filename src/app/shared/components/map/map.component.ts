import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, Marker, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet'
import { Coordinate } from './coordinate.model';

@Component({
  selector: 'app-map',
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  @Input()
  initialCoordinates: Coordinate[] = []; 

  @Output()
  coordinateSelected = new EventEmitter<Coordinate>();

  markerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png'
    })
  }
  options = {
  layers: [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  ],
  zoom: 5,
  center: latLng(46.879966, -121.726909)
  };

  layers: Marker<any>[] = [];

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map(value => 
      new Marker([value.latitude, value.longitude], this.markerOptions)
    );
  }

  handleClick(event: LeafletMouseEvent){
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log(latitude, longitude);
    
    this.layers = [];
    this.layers.push(
      new Marker([latitude, longitude], this.markerOptions)
    );
    this.coordinateSelected.emit({latitude, longitude});
  }
}
