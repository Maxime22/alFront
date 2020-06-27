import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Price } from '../models/price.model';

@Injectable()
export class PriceService {

    constructor(private httpClient: HttpClient) { }

    editPricesToServer(prices: Price[]) {

        let priceData = new FormData();

        let pricesValuesToSend = [];
        for (let index = 0; index < prices.length; index++) {
            let filename = prices[index]["priceTitle"].split(' ').join('_');
            pricesValuesToSend.push(
                {
                    filename: filename,
                    priceTitle: prices[index]["priceTitle"],
                    priceNumber: prices[index]["priceNumber"],
                    orderInPrices: prices[index]["orderInPrices"],
                    content: prices[index]["contentPrice"]
                }
            )
            if (prices[index]["priceId"] !== null && prices[index]["priceId"] !== undefined) {
                pricesValuesToSend[index]["_id"] = prices[index]["priceId"];
            }
            // IF PRICEIMG IS AN URL WE PUT THE URL IN THE OBJECT TO SAVE
            if (typeof prices[index]["priceImg"] === 'string') {
                pricesValuesToSend[index]["priceImgUrl"] = prices[index]["priceImg"]
            } else {
                let file = prices[index]["priceImg"];
                priceData.append('prices', file, filename);
            }
        }

        priceData.append('pricesValues', JSON.stringify(pricesValuesToSend));

        let urlApi = '/alBack/prices/';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.put(urlApi, priceData).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getPricesFromServer() {
        let urlApi = '/alBack/prices/';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.get(urlApi).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    deletePricesToServer(pricesToDelete: string[]) {
        let urlApi = '/alBack/prices/deletePrices';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.post(urlApi, pricesToDelete).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

}