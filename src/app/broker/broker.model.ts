import { Image } from './../shared/image/image.model';

export class Broker {
    public id: number
    public name: string
    public description: string
    public phone: string
    public location: string
    public image: Image

    constructor(id: number, name: string, desc: string, phone: string, location: string, image: Image) {
        this.id = id
        this.name = name
        this.description = desc
        this.phone = phone,
        this.location = location
        this.image = image
    }
}