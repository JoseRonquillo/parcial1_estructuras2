class Producto {
    private codigo: string;
    private nombre: string;
    private p_costo: number;
    private p_venta: number;

    constructor(codigo: string , nombre: string, p_costo :number, p_venta: number) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.p_costo = p_costo;
        this.p_venta = p_venta;
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public getNombre() {
        return this.nombre;
    }

    public setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    public getCodigo() {
        return this.codigo;
    }

    public setP_consto(p_costo: number) {
        this.p_costo = p_costo;
    }

    public getP_costo() {
        return this.p_costo;
    }

    public setP_cventa(p_venta: number) {
        this.p_venta = p_venta;
    }

    public getP_venta() {
        return this.p_venta;
    }

    public getCodigoHash(){
        let contador = 0;
        let cd = ""
        for(const letra of this.codigo){
            if(contador > 0){
                cd += letra;
            }
            contador += 1

        }
        let cd_final = parseInt(cd);
        return cd_final;
    }

    public to_string(){
        return "codigo:" + this.codigo + "  nombre:" + this.nombre + "  p_venta:"+ this.p_venta + "  p_costo: "+ this.p_costo;
    }
}

class Nodo{
    private data: Producto;
    private next: any;

    constructor(data: Producto){
        this.data = data;
        this.next = null;
    }

    public get_data(){
        return this.data;
    }

    public set_next(next: Nodo){
        this.next = next;
    }

    public get_next(){
        return this.next;
    }

    public to_string(){
        return this.data +"";
    }

}

class List{
    private size: number;
    private tail: any;
    private head: any;


    constructor(){
        this.tail = null;
        this.head = null;
        this.size = 0;
    }

    public is_empty(){
        return this.tail == null && this.head == null;
    }

    public append(data: Producto){
        let nodo: Nodo = new Nodo(data);
        if(this.is_empty()){
            this.tail = nodo;
            this.head = nodo;
        }

        else{
            this.tail.set_next(nodo);
            this.tail = nodo;
        }
        this.size += 1;
    }

    public buscar(codigo: number){
        let nombres: string = " ";
        let current = this.head;
        let encontrado: boolean = false; 

        while(current !== null && current !== undefined){
            if(current.data.getCodigoHash() == codigo){
                nombres = nombres + current.data.to_string(); 
                encontrado = true
            }
            current = current.next
        
        }
        
        if (encontrado == false){
            console.log("No se encontro el elemento");
        }else{
            return nombres;
        }
        
    }

    public transversal(){
        let current = this.head;
        let result: string = "";
        while (current !== null){
            result += current.get_data().to_string();
            current = current.next;

            if (current !== null){
                result += "\n"
                }
            }
        return result;
    }
}

class HashTable {
    private size: number;
    private data: List[];

    constructor(size: number) {
        this.data = new Array(size);
        this.size = size;
        for (let i = 0; i < this.data.length; i++) {
            let lista: List = new List();
            this.data[i] = lista;
        }
    }

    private hash(key: number): number {
        return key % this.size;
    }

    public insert(pr: Producto): void {
        let index: number = this.hash(pr.getCodigoHash());
        let lista = this.data[index];
        lista.append(pr);
    }

    public search(codigo:number) {
        let index: number = this.hash(codigo);
        let pr = this.data[index].buscar(codigo);

        return pr;
    }

    public print(): void {
        let datos: string = "";
        for (const dato of this.data) {
            datos += dato.transversal() + " \n"
        }
        console.log(datos);
    }
}

// main
let tablaPr: HashTable = new HashTable(10);
let pr1: Producto = new Producto("P001","Pepto-Bismol",30.5,50);
let pr2: Producto = new Producto("P002","ParaZmol",20,36.5);
let pr3: Producto = new Producto("P003","Alkazeltzer",1.5,2.5);
let pr4: Producto = new Producto("P004","vitapirena",2,4);
let pr5: Producto = new Producto("P055","Vitapirena premiun",8,10);
let pr6: Producto = new Producto("P955","Vitapirena premiun",12,25.5);
let pr7: Producto = new Producto("P205","Aspirina",5,15.5);

tablaPr.insert(pr1);
tablaPr.insert(pr2);
tablaPr.insert(pr3);
tablaPr.insert(pr4);
tablaPr.insert(pr5);
tablaPr.insert(pr6);
tablaPr.insert(pr7);

let codigoBS1: number = pr1.getCodigoHash();
console.log("El producto " + tablaPr.search(codigoBS1) + " esta en la talba hash");
let codigoBS2: number = pr2.getCodigoHash();
console.log("El producto " + tablaPr.search(codigoBS2) + " esta en la talba hash");
let codigoBS3: number = pr3.getCodigoHash();
console.log("El producto " + tablaPr.search(codigoBS3) + " esta en la talba hash");
let codigoBS4: number = pr4.getCodigoHash();
console.log("El producto " + tablaPr.search(codigoBS4) + " esta en la talba hash");
let codigoBS5: number = pr5.getCodigoHash();
console.log("El producto " + tablaPr.search(codigoBS5) + " esta en la talba hash");
let codigoBS6: number = pr6.getCodigoHash();
console.log("El producto " + tablaPr.search(codigoBS6) + " esta en la talba hash");
let codigoBS7: number = pr7.getCodigoHash();
console.log("El producto " + tablaPr.search(codigoBS7) + " esta en la talba hash");

console.log("Tabla: \n");
console.log("///////////////////////////////////////////////////////////////////////////////////\n");
tablaPr.print();
console.log("///////////////////////////////////////////////////////////////////////////////////\n");