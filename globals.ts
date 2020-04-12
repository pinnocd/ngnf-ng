//
// Single point for all global variables
//

import { Injectable } from "@angular/core";


@Injectable()
export class Globals {
    role: string = 'test';

    loginbtn:   boolean;
    logoutbtn:  boolean;
    applybtn:   boolean;
    applibtn:   boolean;
}


export const    PHP_API_SERVER = 
//                "http://ec2-35-177-242-73.eu-west-2.compute.amazonaws.com";
                "http://localhost:8080";


                