// src/app/services/env.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  get(key: string): string | undefined {
    return (window as any).__env?.[key];
  }
}
