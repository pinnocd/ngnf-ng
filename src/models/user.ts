export class Users {
    public id: number;
    public name: string;
    public pwd:string;
    public email:string;
    
    constructor(Id:number,name: string,pwd:string,email:string) {
        this.id = Id;
        this.name = name;
        this.pwd = pwd;
        this.email = email;
    }
}
