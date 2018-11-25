package rentalcar;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
public abstract class Car {
   
    private String placa;
    private String cilindraje;
    private String marca;
    private String color;
    private String transmision;
    private int nPuestos;

    
    public String getPlaca(){
        return placa;
    }
    
    public void setPlaca(String placa){
        this.placa = placa;
    }
    
    public String getCilindraje(){
        return cilindraje;
    }
    
    public void setCilindraje(String cilindraje){
        this.cilindraje = cilindraje;
    }
    
    public String getMarca(){
        return marca;
    }
    
    public void setMarca(String marca){
        this.marca = marca;
    }
    
    public String getColor(){
        return color;
    }
    
    public void setColor(String color){
        this.color = color;
    }
    
    public String getTransmision(){
        return transmision;
    }
    
    public void setTransmision(String transmision){
        this.transmision = transmision;
    }
            
    public int getNPuestos(){
        return nPuestos;
    }
    
    public void setNPuestos(int nPuestos){
        this.nPuestos = nPuestos;
    }
    
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("\nPlaca Carro: ");
        sb.append(placa);
        sb.append("\nCilindraje Carro: ");
        sb.append(cilindraje);
        sb.append("\nMarca Carro: ");
        sb.append(marca);
        sb.append("\nColor Carro: ");
        sb.append(color);    
        sb.append("\nTransmision Carro: ");
        sb.append(transmision);    
        return sb.toString();
    }  

}
