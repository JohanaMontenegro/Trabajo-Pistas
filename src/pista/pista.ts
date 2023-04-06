export class Pista {
    identificador: number;
    titulo: string;
    duracion: number;
    interprete: string;

    constructor(identificador: number,titulo: string,duracion: number,interprete: string) {
             this.identificador = identificador;
             this.titulo = titulo;
             this.duracion = duracion;
             this.interprete = interprete;
    }

}