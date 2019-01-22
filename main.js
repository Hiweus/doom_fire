const W = 30;
const H = 30;

const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];

class DataStructure{
    constructor(width, heigth){
        this.data = [];
        this.heigth = heigth;
        this.width = width;
        for(let i=0;i<width;i++){
            let aux = [];
            for(let j=0;j<heigth;j++){
                aux.push(j+i);
            }
            this.data.push(aux);
        }
    }

    createFireSource(){
        const lastLine = this.data[this.data.length-1];
        for(let i=0;i<this.heigth;i++){
            lastLine[i] = 36;
        }
    }

    firePropagation(){
        var remove = 1;
        for(let i=this.width-2;i>=0;i--){
            for(let j=0;j<this.heigth;j++){
                remove = Math.round(Math.random()*3);
                let aux = this.data[i+1][j]-remove;
                aux = (aux < 0)?0:(aux > 36)?36:aux;
                let tempj = j;
                if(aux%5 == 0){
                    tempj = (j-remove<0)?(j-remove+10):(j-remove);
                }
                this.data[i][tempj] = aux;
            }
        }
    }
    
    createTable(){
        var table = "<table>";
        for(let i=0;i<this.width;i++){
            table+= "<tr>";
            for(let j=0;j<this.heigth;j++){
                let pixelFire = (this.data[i][j]);
                pixelFire = (pixelFire > 36)?36:(pixelFire<0)?0:pixelFire;
                let color = fireColorsPalette[pixelFire];
                if(color == undefined){
                    console.log(color, pixelFire);
                }
                
                let r = color.r.toString();
                let g = color.g.toString();
                let b = color.b.toString()
                
                table += "<td style='background : rgb("+r+","+g+","+b+")'>";
                table += "</td>";
            }
            table += "</tr>";
        }
        table += "</table>";
        document.getElementById("fire").innerHTML = table;

    }

    show(){
        console.log(this.data);

    }
}


var data = new DataStructure(H,W);
data.createFireSource();
setInterval(main,100);

function main(){
    data.firePropagation();
    data.createTable();
    
}