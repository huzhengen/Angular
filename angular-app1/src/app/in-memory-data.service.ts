import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{
    createDb(){
        const stars = [
            {id: 11, name: 'caixukun'},
            {id: 12, name: 'chenlinong'},
            {id: 13, name: 'yangchaoyue'},
            {id: 14, name: 'sunnee'},
            {id: 15, name: 'liziting'},
            {id: 16, name: 'xiaogui'},
            {id: 17, name: 'duanaojuan'},
            {id: 18, name: 'wuxuanyi'},
        ];
        return {stars};
    }
}