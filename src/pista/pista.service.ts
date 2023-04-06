import { Injectable } from '@nestjs/common';
import *as fs from 'fs';
import { Pista } from "./pista";

@Injectable()
export class PistaService {

    private static readonly CANTIDAD_PISTAS = 10;
    public getList(): Pista[] {
        return this.listaPistas;
    }

    private listaPistas: Pista[] = [];
    datos: any;
    constructor() {
        this.loadPistas()

    }
    private loadPistas(): void {
        let archivo = fs.readFileSync('./src/pista/pistas.csv', 'utf8');
        let datos = archivo.split('\n').map(p => p.replace('\r', '')).map(p => p.split(','));
        this.listaPistas = [];
        
        
    }
    public getPistaCSV(id: number): Pista {
        let resultado = this.listaPistas.find(pista => pista.identificador == id);
        return resultado
    }
    public getListaPista(): any {
        return this.listaPistas
    }

    public addPista(pista: any): string {
        let nuevaPista = new Pista(pista.identificador, pista.titulo, pista.duracion, pista.interprete);
        if (nuevaPista.identificador != null && nuevaPista.titulo != null && nuevaPista.duracion != null && nuevaPista.interprete != null) {
            this.listaPistas.push(nuevaPista)
            this.cargarCsv(nuevaPista)
            return "ok"
        } else {
            return "parametro incorrecto"
        }
    }
    private cargarCsv(pista: Pista): void {
        fs.appendFileSync('./src/pista/pistas.csv', `\n${pista.identificador},${pista.titulo},${pista.duracion},${pista.interprete}`)
    }

    public getPistaId(id: number): Pista {
        this.listaPistas.forEach(pista => {
            if (pista.identificador == id) {
                return pista
            }
        });
        return null
    }
    public lanzamiento() {
        Math.floor(Math.random() * (2022 - 1970 + 1) + 1970)

    }
    public getPistas(): any {
        let listaPistas = [];
        for (let i = 0; i < PistaService.CANTIDAD_PISTAS; i++) {
            let pista = {
                'identificador': i,
                'titulo': `titulo ${i}`,
                'duracion': Math.floor(Math.random() * 300),
                'interprete': `interprete ${Math.floor(Math.random() * 3)}`,
                'lanzamiento': this.lanzamiento()
            };
            listaPistas.push(pista);

        } return listaPistas
    }

    public deletePista(posicion: number): string {
        let resultado = this.listaPistas.filter((pista) => pista.identificador != posicion,);
        if (resultado.length != this.listaPistas.length) {
            this.listaPistas = resultado
            this.reescribirCVS();
            return "ok"
        } else {
            return 'error 404 not found'
        }
    }
    public reescribirCVS() {
        fs.writeFile('./src/pista/pistas.cvs', '', function () {
            console.log('reescribir');
        });

        this.listaPistas.forEach((pista) => {
            fs.appendFileSync('./src/pista/pistas.cvs', `${pista.identificador},${pista.titulo},${pista.duracion},${pista.interprete}\n`,);
        });
    }
    public updatePista(id: number, nuevaPista: any): string {
        let pista = new Pista(nuevaPista.identificador, nuevaPista.titulo, nuevaPista.duracion, nuevaPista.interprete);
        if (pista.identificador != null && pista.titulo != null && pista.duracion != null && pista.interprete != null) {
            let index = this.listaPistas.findIndex((pista) => pista.identificador = id,);
            if (index != -1) {
                this.listaPistas[index] = pista;
                return 'ok';
            } else {
                return 'error 404';
            }
        } else {
            return 'parametro incorrecto'
        }

    }
}

