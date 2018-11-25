package rentalcar;

import java.util.Date;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
public class RentalTransaction {
    
    private int id;
    private Date fecha;
    private Date pickupDate;
    private Date returnDate;
    private double valorHora;
    private double valorTotal;
    private Car car;
    private Customer customer;
    
    public int getId(){
        return id;
    }
    
    public void setId(int id){
        this.id = id;
    }
    
    public Date getFecha(){
        return fecha;
    }
    
    public void setFecha(Date fecha){
        this.fecha = fecha;
    }
    
    public Date pickupDate(){
        return pickupDate;
    }
    
    public void setPickupDate(Date pickupDate){
        this.pickupDate = pickupDate;
    }
    
    public Date returnDate(){
        return returnDate;
    }
    
    public void setReturnDate(Date returnDate){
        this.returnDate = returnDate;
    }
    
    public double getValorHora(){
        return valorHora;
    }
    
    public void setValorHora(double valorHora){
        this.valorHora = valorHora;
    }
    
    public double getValorTotal(){
        return valorTotal;
    }
    
    public void setValorTotal(double valorTotal){
        this.valorTotal = valorTotal;
    }
    
    public Car getCar() {
        return car;
    }

    public void rentarCar(Car car) {
        this.car = car;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("\nId Transaccion: ");
        sb.append(id);
        sb.append("\nFecha Transaccion: ");
        sb.append(fecha);
        sb.append("\nPickup Date Transaccion: ");
        sb.append(pickupDate);
        sb.append("\nReturn Date Transaccion: ");
        sb.append(returnDate);
        sb.append("\nCliente Transaccion: ");
        sb.append(customer);
        sb.append("\nCarro en Transaccion: ");
        sb.append(car);
        sb.append("\nValor Hora Transaccion: ");
        sb.append(valorHora);
        sb.append("\nValor Total Transaccion: ");
        sb.append(valorTotal);
        return sb.toString();
    }  
    
}