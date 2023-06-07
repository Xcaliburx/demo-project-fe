import { Developer } from './../developer/developer.model';

export class Broker {
    public id: number
    public name: string
    public description: string
    public phone: string
    public location: string
    public developers: Developer[]

    constructor(id: number, name: string, desc: string, phone: string, location: string, developers: Developer[]) {
        this.id = id
        this.name = name
        this.description = desc
        this.phone = phone,
        this.location = location
        this.developers = developers
    }
}