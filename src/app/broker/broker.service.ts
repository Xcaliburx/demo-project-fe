import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Broker } from "./broker.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BrokerService {
    brokersChanged = new Subject<Broker[]>
    constructor(private http: HttpClient) {}

    fetchBroker () {
        return this.http.get<Broker[]>(
            "http://localhost:8085/broker"
        )
    }

    getBrokerById (id: number) {
        return this.http.get<Broker>(
            "http://localhost:8085/broker/" + id
        )
    }

    addBroker (broker: Broker) {
        return this.http.post(
            "http://localhost:8085/broker",
            broker
        )
    }

    updateBroker (id: number, broker: Broker) {
        return this.http.put(
            "http://localhost:8085/broker/" + id,
            broker
        )
    }

    deleteBroker(id: number) {
        return this.http.delete(
            "http://localhost:8085/broker/" + id,
        )
    }
}