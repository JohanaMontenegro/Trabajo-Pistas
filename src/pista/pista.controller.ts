import { Controller, Get, Param, Post, Body, Put, Delete,Query } from '@nestjs/common';
import { Pista } from './pista';
import { PistaService } from './pista.service';

@Controller('pista')
export class PistaController {
    constructor(private pistaService: PistaService) { }

    //@Get()
    //public getPistas(): string {
        //return this.pistaService.getPistas();
    //}

    @Get()
    public getList(): Pista[] {
        return this.pistaService.getList();
    }

    @Get('id')
    public getPistaId(@Param('id')id):Pista{
        return this.pistaService.getPistaId(parseInt(id));
    }
    @Get()
    public getPistaParameter(@Query('index')index):Pista{
        return this.pistaService.getPistaId(parseInt(index));
    }


    @Post()
    create(@Body() pista: any): string {
        return this.pistaService.addPista(pista);
    }

    @Delete(':id') 
    public deletePista(@Param('id') id:number):string{
        return this.pistaService.deletePista(id)
    }

    @Put(':id')
    public update(@Body() pista:any, @Param('id') id:number):string {
        return this.pistaService.updatePista(id,pista)

    }
}