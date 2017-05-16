import { API_URL, DynamicLoadService } from './dynamic.service'

export const DynamicLoadServiceInjectables: Array<any> = [
    { provide: DynamicLoadService, useClass: DynamicLoadService },
    { provide: API_URL, useValue: API_URL },
];