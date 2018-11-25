package rentalcar;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
public class Customer {
    
    private int id;
    private String nombre;
    private String genero;
    private String tipo;
    
    public Customer(int id, String nombre, String genero, String tipo){
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.tipo = tipo;
    }

    Customer() {
       this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.tipo = tipo;
    }
 
    public int getId(){
        return id;
    }
    
    public void setId(int id){
        this.id = id;
    }
    
    public String getNombre(){
        return nombre;
    }
    
    public void setNombre(String nombre){
        this.nombre = nombre;
    }
    
    public String getGenero(){
        return genero;
    }
    
    public void setGenero(String genero){
        this.genero = genero;
    }
    
    public String getTipo(){
        return tipo;
    }
    
    public void setTipo(String tipo){
        this.tipo = tipo;
    }
    
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("\nId Cliente: ");
        sb.append(id);
        sb.append("\nNombre Cliente: ");
        sb.append(nombre);
        sb.append("\nGenero Cliente: ");
        sb.append(genero);
        sb.append("\nTipo Cliente: ");
        sb.append(tipo);    
        return sb.toString();
    }   
}
