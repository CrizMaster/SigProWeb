// round-number.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundNumber',
    standalone: true,
})
export class RoundNumberPipe implements PipeTransform {
    transform(value: number | string): number {
        return Math.round(Number(value));
    }
}
