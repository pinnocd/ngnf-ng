export class User_class {

    public  id: number;
    public  name: string;
    public  password: string;
    public  email: string;

}

export class User_model {

    constructor(

        public  id: number,
        public  name: string,
        public  password: string,
        public  email: string
    ) {}
}