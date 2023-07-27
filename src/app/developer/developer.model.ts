import { Project } from './project/project.model';
import { Image } from './../shared/image/image.model';

export class Developer {
    public id: number
    public name: string
    public location: string
    public fee: number
    public image: Image
    public projects: Project[]

    constructor(id: number, name: string, location: string, fee: number, image: Image, projects: Project[]) {
        this.id = id
        this.name = name
        this.location = location
        this.fee = fee
        this.image = image
        this.projects = projects
    }
}