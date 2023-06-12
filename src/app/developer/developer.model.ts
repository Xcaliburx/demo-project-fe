import { Image } from './../shared/image/image.model';

export class Developer {
    public id: number
    public name: string
    public location: string
    public fee: number
    public image : Image

    constructor(id: number, name: string, location: string, fee: number, image: Image) {
        this.id = id
        this.name = name
        this.location = location
        this.fee = fee
        this.image = image
    }
}