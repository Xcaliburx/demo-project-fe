
export class Project {
    public id: number
    public projectName: string
    public description: string
    public price: number

    constructor(id: number, name: string, desc: string, price: number) {
        this.id = id
        this.projectName  = name
        this.description = desc
        this.price = price
    }
}