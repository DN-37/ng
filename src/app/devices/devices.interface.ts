export interface IDevice {
  id: number;
  name: string;
  last_active: string;
}

export interface DevicesResponse {
  data: {
    metering_devices: {
      data: IDevice[];
      total: number;
    };
  };
}

export interface DevicesRequest {
  last_page: number;
  sort_field: string;
  sort: string;
  search_string: string | null;
  device_state: string;
  is_archived: boolean;
  paginate: boolean;
  append_fields: string[];
  per_page: number;
}
