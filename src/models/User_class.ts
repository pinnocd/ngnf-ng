export class User_class {

    public  id: number;
    public  name: string;
    public  password: string;
    public  email: string;
    public  usertype: string;

}

export class User_model {

    constructor(

        public  id: number,
        public  name: string,
        public  password: string,
        public  email: string,
        public  usertype: string
    ) {}
}