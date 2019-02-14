import {ResponseEntity} from "./ResponseEntity";

export class ResponseEntityMapper {
    mapEntityFromJson(data: any): ResponseEntity {
        return new ResponseEntity(data.statusCode, data, data.headers, data.contentType);
    }
}
