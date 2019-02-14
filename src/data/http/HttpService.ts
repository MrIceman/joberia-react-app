import {ResponseEntityMapper} from "./ResponseEntityMapper";
import {ResponseEntity} from "./ResponseEntity";
import {API, PLATFORM_ID} from "../../Settings";

type HttpConfig = {
    platformIdRequired: boolean,
    platformId: number
}

export class HttpService {
    constructor(
        public readonly responseEntityMapper: ResponseEntityMapper,
        public readonly host: string = API) {

    }

    async makeUnsignedRequest(data: any,
                              endpoint: string,
                              contentType = 'application/json',
                              method = 'POST',
                              headers = {},
                              debug: boolean = false,
                              config: HttpConfig = {
                                  platformIdRequired: true,
                                  platformId: PLATFORM_ID
                              },): Promise<ResponseEntity> {

        return new Promise<ResponseEntity>(async (resolve, reject) => {
            if (debug)
                console.log('Sending unsigned request:' + this.host + JSON.stringify(data) + " to " + endpoint);
            let verifiedEndpoint = this.host + endpoint;
            if (config.platformIdRequired && method == 'GET')
                verifiedEndpoint += `?platform=${config.platformId}`;

            const result = await fetch(verifiedEndpoint,
                {
                    method: method,
                    headers: {
                        'Content-Type': contentType,
                        ...headers
                    },
                    body: method == 'GET' ? null : JSON.stringify(data)
                });
            if (debug)
                console.log('raw response: ' + JSON.stringify(result));

            const json_result = await result.json();
            console.log('Response: ' + JSON.stringify(json_result));
            let response = this.responseEntityMapper.mapEntityFromJson(json_result);

            // check if response contains error message
            resolve(response);


        })
    }

    makeSignedRequest(data: any, token: string, endpoint: string, contentType = 'application/json', method = 'POST', debug: boolean = false): Promise<ResponseEntity> {
        return new Promise<ResponseEntity>((resolve, reject) => {
            // code to do http call
            console.log('Sending signed request:' + JSON.stringify(data) + " /  to " + this.host + endpoint);
            fetch(this.host + endpoint,
                {
                    method: method,
                    headers: {
                        'Content-Type': contentType,
                        'Authorization': `JWT ${token}`
                    },
                    body: method == 'GET' ? null : JSON.stringify(data)
                }).then(async (result) => {
                if (debug)
                    console.log('Raw Response: ' + JSON.stringify(result));
                let resultJson = await result.json();
                let response = this.responseEntityMapper.mapEntityFromJson(resultJson);
                // check if response contains error message
                if (debug)
                    console.log('Response: ' + JSON.stringify(response));
                resolve(response);
            }).catch((error) => {
                console.log('something went wrong!: ' + JSON.stringify(error));
            });

            // reject(response);
        })
    }
}
