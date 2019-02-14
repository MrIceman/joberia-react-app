export abstract class EntityMapper<MODEL> {
    abstract mapFromResponse(data: any): MODEL;

    mapArray(data: any): Array<MODEL> {
        let array = data as [];
        return array.map((item, _) => this.mapFromResponse(item));
    };
}
