package rentalcar;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
import java.util.Scanner;
import java.util.ArrayList;
import java.io.IOError;
import java.util.Date;
public class AppRentalCar {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        // Patron de Diseño Singleton
        
        // Instance 1
        AppRentalCarTester instance1 = AppRentalCarTester.getInstance();
        // Instance 2
        AppRentalCarTester instance2 = AppRentalCarTester.getInstance();
        
        System.out.println("Instance 1 hash: " + instance1);
        System.out.println("Instance 2 hash: " + instance2);
        System.out.println("");
        
        // Patron de Diseño Abstract Factory
        
        Scanner lector = new Scanner(System.in);
        ArrayList<Car> listCars = null;
        ArrayList<Customer> listCustomers = null;
        ArrayList<RentalTransaction> listTransacciones = null;
        Customer customer;
        RentalTransaction transaccion;
        Car car;
        SportCar sportCar = null;
        FamilyCar familyCar = null;
        StandardCar standardCar = null;
        int index = 1;
        int idInicial = 1;
        int cantidadCarros;
        String dato = "";
        while(index != 0){
            System.out.println("Bienvenido a RENTA DE CARROS");
            System.out.println("");
            System.out.println("DATOS DEL CLIENTE");
            System.out.println("Ingrese sus datos");
            System.out.print("Nombre: ");
            dato = lector.nextLine();
            customer = new Customer();
            customer.setId(idInicial);
            customer.setNombre(dato);
            System.out.print("Genero: ");
            dato = lector.nextLine();
            customer.setGenero(dato);
            System.out.print("Tipo (vip o normal): ");
            dato = lector.nextLine();
            customer.setTipo(dato);
            listCustomers.add(customer);
            System.out.println("");
            System.out.println("DATOS DE LOS CARROS");
            System.out.println("Ingrese el tipo de carro que desea rentar, asi: + \n"
                    + "1. Carro Familiar. \n"
                    + "2. Carro Deportivo. \n"
                    + "3. Carro Estandar");
            int carro = lector.nextInt();
            System.out.println("");
            System.out.println("¿Cuantos carros de ese tipo desea rentar?");
            cantidadCarros = lector.nextInt();
            switch(carro){
                case 1:
                    for(int i = 0; i < cantidadCarros; i++){
                        familyCar = new FamilyCar();
                        familyCar.setPlaca("H2H2H2");
                        familyCar.setCilindraje("1000");
                        familyCar.setMarca("Renault Sandero");
                        familyCar.setColor("Azul");
                        familyCar.setTransmision("Mecanica");
                        familyCar.setNPuestos(4);
                        familyCar.setValorHora(3000);
                        familyCar.setSeguro("Todo Riesgo");
                        familyCar.setStock(cantidadCarros--);
                        listCars.add(familyCar);
                    }
                    System.out.println("-> Se ha rentado" + cantidadCarros + " carro(s) familiar(es)");
                    break;
                case 2:
                    for(int i = 0; i < cantidadCarros; i++){
                        sportCar = new SportCar();
                        sportCar.setPlaca("H2H2H10");
                        sportCar.setCilindraje("1600");
                        sportCar.setMarca("Ferrari");
                        sportCar.setColor("Blanco");
                        sportCar.setTransmision("Automatica");
                        sportCar.setNPuestos(4);
                        sportCar.setValorHora(5000);
                        sportCar.setSeguro("Todo Riesgo");
                        sportCar.setStock(cantidadCarros--);
                        listCars.add(sportCar);
                    }
                    System.out.println("-> Se ha rentado" + cantidadCarros + " carro(s) deportivo(s)");
                    break;
                case 3:
                    for(int i = 0; i < cantidadCarros; i++){
                        standardCar = new StandardCar();
                        standardCar.setPlaca("H2F2T3");
                        standardCar.setCilindraje("1200");
                        standardCar.setMarca("Mazda");
                        standardCar.setColor("Negro");
                        standardCar.setTransmision("Automatica");
                        standardCar.setNPuestos(4);
                        standardCar.setValorHora(4000);
                        standardCar.setSeguro("Standard");
                        standardCar.setStock(cantidadCarros--);
                        listCars.add(standardCar);
                    }
                    System.out.println("-> Se ha rentado" + cantidadCarros + " carro(s) estandar");
                    break;
                default:
                    throw new IOError(new Exception("Ese carro no esta a la renta"));
            }
            System.out.println("DATOS DE LA TRANSACCION");
            System.out.println("");
            transaccion = new RentalTransaction();
            transaccion.setId(idInicial);
            Date date = new Date();
            transaccion.setFecha(date);
            transaccion.setPickupDate(date);
            transaccion.setReturnDate(date);
            transaccion.setValorHora(familyCar.getValorHora() + sportCar.getValorHora() + standardCar.getValorHora());
            transaccion.setValorTotal(familyCar.getValorHora()*cantidadCarros + sportCar.getValorHora()*cantidadCarros + standardCar.getValorHora()*cantidadCarros);
            listTransacciones.add(transaccion);
            System.out.println("");
            
            // Se imprime el informe de la transaccion
            transaccion.toString();
            idInicial++;   
        }
    }
    
}
