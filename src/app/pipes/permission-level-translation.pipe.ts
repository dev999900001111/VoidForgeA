import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissionLevelTranslation',
  standalone: true
})
export class PermissionLevelTranslationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
