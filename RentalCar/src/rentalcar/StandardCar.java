package rentalcar;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
public class StandardCar extends Car{
    
    private double valorHora;
    private String seguro;
    private int stock = 10;
    
    public double getValorHora(){
        return valorHora;
    }
    
    public void setValorHora(double valorHora){
        this.valorHora = valorHora;
    }
    
    public String getSeguro(){
        return seguro;
    }
    
    public void setSeguro(String seguro){
        this.seguro = seguro;
    }
    
    public int getStock(){
        return stock;
    }
    
    public void setStock(int stock){
        this.stock = stock;
    }
    
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("\nValor Hora Carro: ");
        sb.append(valorHora);
        sb.append("\nSeguro Carro: ");
        sb.append(seguro);   
        sb.append("\nStock Carro: ");
        sb.append(stock);   
        return sb.toString();
    }  
}
