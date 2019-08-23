import { Injectable } from '@nestjs/common';
import { Cat } from './cat';

@Injectable()
export class CatsService {
    cats: Cat[] = [{ id: 1, name: 'Cat'}];

    getCats() {
        return this.cats;
    }

    createCat(cat: Cat) {
        this.cats = [ ...this.cats, {...cat}];
    }
}
