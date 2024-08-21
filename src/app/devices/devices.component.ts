import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCard } from '@angular/material/card';
import { IDevice, DevicesResponse, DevicesRequest } from './devices.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { URL } from '../consts/consts';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [MatCard, MatPaginator, DatePipe],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  devices: IDevice[] = [];
  total: number = 0;
  currentPage: number = 1;

  request: DevicesRequest = {
    last_page: 0,
    sort_field: 'id',
    sort: 'desc',
    search_string: null,
    device_state: 'all',
    is_archived: false,
    paginate: true,
    append_fields: ['active_polling', 'attributes', 'tied_point'],
    per_page: 10,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDevices(this.currentPage);
  }

  getDevices(page: number): void {
    this.http
      .post<DevicesResponse>(`${URL}/device/metering_devices`, {
        page: page,
        ...this.request,
      })
      .subscribe({
        next: (response: DevicesResponse) => {
          this.devices = response.data.metering_devices.data || [];
          this.total = response.data.metering_devices.total || 0;
        },
      });
  }

  nextPage(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.getDevices(this.currentPage);
  }
}
